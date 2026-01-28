"use client";

import React, { useState, useMemo } from "react";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import Button from "@/app/_components/atoms/Button";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import RangeInput from "@/app/_components/molecules/calculator/RangeInput";
import NumberInput from "@/app/_components/molecules/calculator/NumberInput";
import CurrencyDisplay from "@/app/_components/molecules/calculator/CurrencyDisplay";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import TipBox from "@/app/_components/molecules/calculator/TipBox";
import RadioGroup, {
  type RadioOption,
} from "@/app/_components/molecules/calculator/RadioGroup";
import { BadgeCheck, Percent, User, Clock } from "lucide-react";

// Sazby sociálního pojištění
const OLD_AGE_RATE = 0.065; // 6,5% pojištění starobní
const DISABILITY_RATE = 0.03; // 3% pojištění invalidní
const TOTAL_BASE_RATE = 0.095; // Celková základní sazba ~9,5%
const MIN_MONTHLY_MAIN = 1944; // Minimální měsíční pojistné - hlavní činnost
const MIN_MONTHLY_SECONDARY = 486; // Minimální měsíční pojistné - vedlejší činnost

export default function SocialSecurityPage() {
  const [annualIncome, setAnnualIncome] = useState<number>(500000);
  const [isMainActivity, setIsMainActivity] = useState<boolean>(true);

  const calculations = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const calculatedMonthly = monthlyIncome * TOTAL_BASE_RATE;
    const minMonthly = isMainActivity
      ? MIN_MONTHLY_MAIN
      : MIN_MONTHLY_SECONDARY;
    const monthlyInsurance = Math.max(calculatedMonthly, minMonthly);
    const annualInsurance = monthlyInsurance * 12;

    // Rozpis po jednotlivých typech
    const oldAgeMonthly = monthlyIncome * OLD_AGE_RATE;
    const disabilityMonthly = monthlyIncome * DISABILITY_RATE;

    return {
      monthlyIncome: Math.round(monthlyIncome),
      oldAgeMonthly: Math.round(oldAgeMonthly),
      disabilityMonthly: Math.round(disabilityMonthly),
      calculatedMonthly: Math.round(calculatedMonthly),
      monthlyInsurance: Math.round(monthlyInsurance),
      annualInsurance: Math.round(annualInsurance),
      isMinimum: calculatedMonthly < minMonthly,
      minMonthly,
    };
  }, [annualIncome, isMainActivity]);

  const handleSliderChange = (value: number) => {
    setAnnualIncome(value);
  };

  const handleInputChange = (value: number) => {
    setAnnualIncome(value);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });
  };

  const activityOptions: RadioOption[] = [
    {
      value: true,
      label: "Hlavní činnost",
      description: `Minimální pojistné: ${formatCurrency(MIN_MONTHLY_MAIN)}/měsíc`,
    },
    {
      value: false,
      label: "Vedlejší činnost",
      description: `Minimální pojistné: ${formatCurrency(MIN_MONTHLY_SECONDARY)}/měsíc`,
    },
  ];

  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Sociální pojištění",
          secondHeading: "pro OSVČ",
          text: "Spočítejte si, kolik budete platit na sociální a důchodové pojištění. Pojistné se počítá jako 9,5% z vašich příjmů s minimální sazbou.",
          buttonsColumns: 1,
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}
          <div className="bg-white rounded-2xl border-2 border-zinc-200 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bebas mb-8">
              Vaše sociální pojištění
            </h2>

            {/* Input sekce */}
            <div className="mb-12 space-y-6">
              <RangeInput
                label="Váš roční příjem (Kč)"
                min={0}
                max={3000000}
                step={10000}
                value={annualIncome}
                onChange={handleSliderChange}
                marks={[
                  { value: 0, label: "0 Kč" },
                  { value: 1500000, label: "1,5M Kč" },
                  { value: 3000000, label: "3M Kč" },
                ]}
              />
              <NumberInput
                value={annualIncome}
                onChange={handleInputChange}
                placeholder="Zadejte příjem"
                helperText="Zadejte částku přímo nebo použijte posuvník"
              />
              <div>
                <RadioGroup
                  label="Typ činnosti"
                  name="activity-type"
                  options={activityOptions}
                  value={isMainActivity}
                  onChange={(value) => setIsMainActivity(value as boolean)}
                />
              </div>
            </div>

            {/* Výsledky */}
            <div className="space-y-6">
              <CurrencyDisplay
                label="Měsíční pojistné"
                value={calculations.monthlyInsurance}
                backgroundColor="secondary"
              >
                {calculations.isMinimum && (
                  <p className="text-sm text-secondary mt-3 flex items-center gap-2">
                    <BadgeCheck size={16} />
                    Platíte minimální pojistné (
                    {formatCurrency(calculations.minMonthly)}/měsíc)
                  </p>
                )}
              </CurrencyDisplay>

              <CurrencyDisplay
                label="Roční pojistné"
                value={calculations.annualInsurance}
                backgroundColor="primary"
              />

              {/* Detailní rozpis */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-textP mb-1">Měsíční příjem</p>
                    <p className="text-2xl font-bebas text-primary">
                      {formatCurrency(calculations.monthlyIncome)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-textP mb-1">
                      Pojištění starobní (6,5%)
                    </p>
                    <p className="text-2xl font-bebas text-secondary">
                      {formatCurrency(calculations.oldAgeMonthly)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-textP mb-1">
                      Pojištění invalidní (3%)
                    </p>
                    <p className="text-2xl font-bebas text-secondary">
                      {formatCurrency(calculations.disabilityMonthly)}
                    </p>
                  </div>
                </div>

                <TipBox text="Sociální pojištění se skládá z pojištění starobního (6,5%) a invalidního (3%). Při nižších příjmech platíte minimální pojistné, bez ohledu na výši příjmu." />
              </div>
            </div>
          </div>

          {/* Informační sekce */}
          <div className="mt-16 flex flex-col gap-8">
            <InfoCard
              icon={<Percent size={32} />}
              title="Jaké sazby?"
              description="Sociální pojištění činí 9,5% z měsíčního příjmu. Skládá se z pojištění starobního (6,5%) a invalidního (3%)."
            />

            <InfoCard
              icon={<Clock size={32} />}
              title="Kdy se platí?"
              description="Pojistné se platí měsíčně do 20. dne kalendářního měsíce, který následuje po měsíci, za který se pojistné počítá."
            />

            <InfoCard
              icon={<User size={32} />}
              title="Rozdíl činností"
              description="Hlavní činnost má vyšší minimální pojistné (1 944 Kč) než vedlejší činnost (486 Kč). Volba závisí na vaší registraci."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta
        options={{
          heading: "Chcete mít přehled o všech povinnostech?",
          subheading:
            "OSVC365 vám upozorňuje na všechny termíny a povinnosti automaticky.",
          dataDestination: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ecomail/news`,
          buttonText: "Koupit službu",
          inputType: "email",
          placeholder: "Zde zadejte email",
        }}
      />
    </>
  );
}
