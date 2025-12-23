"use client";

import React, { useState, useMemo } from "react";
import MainServiceBox from "./_components/MainServiceBox";
import SearchBar from "@/app/(hub)/hub/_components/SearchBar";
import BusinessActivityItem from "./_components/BusinessActivityItem";
import OrderSummary from "./_components/OrderSummary";
import { businessActivities } from "../../_data/businessActivities";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

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
    .filter((activity) => selectedActivities.includes(activity.id))
    .map((activity) => ({
      name: activity.name,
      price: activity.price,
      id: activity.id,
      priceId: activity.priceId,
    }));

  // Handler pro checkout
  const handleCheckout = async () => {
    // TODO: Implementovat přesměrování na platební bránu
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stripe/buy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: selectedActivityData.map((activity) => ({
              id: activity.id,
              priceId: activity.priceId,
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
      <div className="max-w-wrapper flex flex-col items-center mt-20">
        {/* Hlavička */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-3xl font-semibold text-zinc-800 mb-4">
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
                  <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800">
                    Přidat předmět podnikání
                  </h2>
                  <span className="px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-md uppercase">
                    Volitelné
                  </span>
                </div>
                <p className="text-zinc-600">
                  Naprostá většina věcí je již v základním balíčku. Pokud ale
                  chcete detaily, můžete vybrat specifickou skupinu předmětů
                  podnikání. Můžete vybrat více předmětů najednou. Předměty
                  postupně doplňujeme dle zájmu.
                </p>
              </div>

              {/* Searchbar */}
              <div className="mb-6">
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Hledat předmět podnikání..."
                  debounceMs={300}
                />
              </div>

              {/* Výpis předmětů */}
              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <BusinessActivityItem
                      key={activity.id}
                      name={activity.name}
                      description={activity.description}
                      price={activity.price}
                      items={activity.items}
                      isSelected={selectedActivities.includes(activity.id)}
                      onToggle={() => toggleActivity(activity.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-zinc-500 text-lg">
                      Nenalezeny žádné výsledky pro "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pravá strana - Souhrn objednávky */}
          <div className="lg:col-span-1">
            <OrderSummary
              selectedActivities={selectedActivityData}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
