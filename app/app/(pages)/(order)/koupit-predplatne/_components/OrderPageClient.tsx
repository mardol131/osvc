"use client";

import React, { useState, useMemo } from "react";
import MainServiceBox from "./MainServiceBox";
import SearchBar from "@/app/(pages)/(hub)/_hub/_components/SearchBar";
import BusinessActivityItem from "./BusinessActivityItem";
import OrderSummary, { OrderFormData } from "./OrderSummary";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import { ActivityGroup } from "@/app/_data/businessActivities";
import Button from "@/app/_components/atoms/Button";

type Props = {
  activitiesGroups?: ActivityGroup[];
};

export default function OrderPageClient(props: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [businessActivities] = useState<ActivityGroup[]>(
    props.activitiesGroups || [],
  );
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrování předmětů podnikání podle vyhledávání

  // Toggle výběru předmětu podnikání
  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId],
    );
  };

  // Připravení dat pro summary
  const selectedActivityData = businessActivities
    .filter((activity) => selectedActivities.includes(activity.slug))
    .map((activity) => activity);

  // Handler pro checkout
  const handleCheckout = async (formData: OrderFormData) => {
    // TODO: Implementovat přesměrování na platební bránu
    setIsSubmitting(true);

    const generalGroup = props.activitiesGroups?.find(
      (ag) => ag.slug === "general",
    );

    if (!generalGroup) {
      console.error(
        "Chyba: Obecná skupina předmětů podnikání nebyla nalezena.",
      );
      return;
    }

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
            activityGroups: [
              generalGroup,
              ...selectedActivityData.map((activity) => activity),
            ],
            terms: formData.terms,
            marketing: formData.marketing,
          }),
        },
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

    setIsSubmitting(false);
  };

  // Smooth scroll na předměty podnikání
  const scrollToActivities = () => {
    const section = document.getElementById("business-activities-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const generalGroup = useMemo(() => {
    return businessActivities.find((ag) => ag.slug === "general");
  }, [businessActivities]);

  return (
    <SectionWrapper>
      <div className="max-w-wrapper flex flex-col items-center">
        {/* Hlavička */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-zinc-800 mb-3">Dokončit objednávku</h1>
          <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto">
            Vyberte si základní předplatné a případně přidejte sledování
            specifických předmětů podnikání
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Levá strana - Formulář */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Box hlavní služby */}
            {generalGroup && <MainServiceBox {...generalGroup} />}

            {/* Sekce přidání předmětů podnikání */}
            <div
              id="business-activities-section"
              className="bg-white rounded-xl border border-zinc-200 p-5 md:p-6 shadow-sm"
            >
              <div className="mb-5 md:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-zinc-800">Přidat předměty podnikání</h2>
                  <span className="inline-block w-fit px-2.5 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-md uppercase">
                    Volitelné
                  </span>
                </div>
                <p className="text-zinc-600 text-sm md:text-base">
                  To nejdůležitější je již v základním balíčku. Pokud ale chcete
                  detaily, můžete vybrat z nabídky skupiny předmětů. Nabídku
                  postupně doplňujeme dle zájmu.
                </p>
              </div>

              {/* Výpis předmětů */}
              <div className="space-y-3 md:space-y-4">
                {businessActivities.length > 0 &&
                  businessActivities
                    .filter((activity) => activity.slug !== "general")
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
              isSubmitting={isSubmitting}
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
