"use client";

import React, { useState, useMemo } from "react";
import MainServiceBox from "./MainServiceBox";
import SearchBar from "@/app/(hub)/hub/_components/SearchBar";
import BusinessActivityItem from "./BusinessActivityItem";
import OrderSummary, { OrderFormData } from "./OrderSummary";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import { BusinessActivity } from "@/app/_data/businessActivities";

type Props = {
  activitiesGroups?: BusinessActivity[];
};

export default function OrderPageClient(props: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [businessActivities] = useState<BusinessActivity[]>(
    props.activitiesGroups || []
  );

  // Filtrování předmětů podnikání podle vyhledávání
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return businessActivities;

    const query = searchQuery.toLowerCase();
    return businessActivities.filter(
      (activity) =>
        activity.name.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.keywords.some((keyword) => keyword.includes(query))
    );
  }, [searchQuery]);

  // Toggle výběru předmětu podnikání
  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Připravení dat pro summary
  const selectedActivityData = businessActivities
    .filter((activity) => selectedActivities.includes(activity.slug))
    .map((activity) => ({
      name: activity.name,
      price: activity.price,
      slug: activity.slug,
      id: activity.id,
    }));

  // Handler pro checkout
  const handleCheckout = async (formData: OrderFormData) => {
    // TODO: Implementovat přesměrování na platební bránu
    try {
      console.log("Form data:", formData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            phonePrefix: formData.phonePrefix,
            activityGroups: selectedActivityData.map((activity) => ({
              slug: activity.slug,
              id: activity.id,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Chyba při vytváření platební relace");
      }

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Chyba: Neplatná URL platební brány");
      }
    } catch (error) {
      console.error("Chyba při přesměrování na platební bránu:", error);
    }
  };

  return (
    <SectionWrapper>
      <div className="max-w-wrapper flex flex-col items-center">
        {/* Hlavička */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-3xl text-zinc-800 mb-4">
            Dokončit objednávku
          </h1>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Vyberte si základní předplatné a případně přidejte sledování
            specifických předmětů podnikání
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Levá strana - Formulář */}
          <div className="lg:col-span-2 space-y-8">
            {/* Box hlavní služby */}
            <MainServiceBox />

            {/* Sekce přidání předmětů podnikání */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-lg">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl text-zinc-800">
                    Přidat předmět podnikání
                  </h2>
                  <span className="px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-md uppercase">
                    Volitelné
                  </span>
                </div>
                <p className="text-zinc-600">
                  Naprostá většina věcí je již v základním balíčku. Pokud ale
                  chcete detaily, můžete vybrat z nabídky skupiny předmětů.
                  Nabídku postupně doplňujeme dle zájmu.
                </p>
              </div>

              {/* Searchbar */}
              {/* <div className="mb-6">
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Hledat předmět podnikání..."
                  debounceMs={300}
                />
              </div> */}

              {/* Výpis předmětů */}
              <div className="space-y-4">
                {businessActivities.length > 0 &&
                  businessActivities.map((activity) => (
                    <BusinessActivityItem
                      key={activity.slug}
                      {...activity}
                      isSelected={selectedActivities.includes(activity.slug)}
                      onToggle={() => toggleActivity(activity.slug)}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Pravá strana - Souhrn objednávky */}
          <div className="lg:col-span-1">
            <OrderSummary
              selectedActivities={selectedActivityData}
              onSubmit={handleCheckout}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
