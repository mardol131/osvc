"use client";

import React, { useState, useMemo } from "react";
import MainServiceBox from "./MainServiceBox";
import SearchBar from "@/app/(hub)/hub/_components/SearchBar";
import BusinessActivityItem from "./BusinessActivityItem";
import OrderSummary, { OrderFormData } from "./OrderSummary";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import { BusinessActivity } from "@/app/_data/businessActivities";
import Button from "@/app/_components/atoms/Button";

type Props = {
  activitiesGroups?: BusinessActivity[];
};

export default function OrderPageClient(props: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [businessActivities] = useState<BusinessActivity[]>(
    props.activitiesGroups || []
  );
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  // Filtrování předmětů podnikání podle vyhledávání

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
            terms: formData.terms,
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

  // Smooth scroll na předměty podnikání
  const scrollToActivities = () => {
    const section = document.getElementById("business-activities-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <div
              id="business-activities-section"
              className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-lg"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl text-zinc-800">
                    Přidat předměty podnikání
                  </h2>
                  <span className="px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-md uppercase">
                    Volitelné
                  </span>
                </div>
                <p className="text-zinc-600">
                  To nejdůležitější je již v základním balíčku. Pokud ale chcete
                  detaily, můžete vybrat z nabídky skupiny předmětů. Nabídku
                  postupně doplňujeme dle zájmu.
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
                  businessActivities
                    .sort((a, b) => (a.order || 1000) - (b.order || 1000))
                    .map((activity) => (
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
              isOpen={isOrderSummaryOpen}
              onOpenChange={setIsOrderSummaryOpen}
            />
          </div>
        </div>

        {/* Fixní tlačítko pro mobilní zařízení */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-200 shadow-lg lg:hidden z-40">
          <div className="grid grid-cols-2 gap-4">
            <Button
              text="Přidat předměty"
              onClick={scrollToActivities}
              variant="outlined"
              size="sm"
            />
            <Button
              text="Zobrazit souhrn"
              onClick={() => setIsOrderSummaryOpen(true)}
              variant="gold"
              size="sm"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
