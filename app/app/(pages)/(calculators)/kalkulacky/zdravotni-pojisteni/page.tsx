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
import { Info, FileText, BarChart3, Calendar } from "lucide-react";

const HEALTH_INSURANCE_RATE = 0.135; // 13,5%
const MIN_MONTHLY_MAIN = 876; // Minimální měsíční pojistné - hlavní činnost
const MIN_MONTHLY_SECONDARY = 117; // Minimální měsíční pojistné - vedlejší činnost

export default function HealthInsurancePage() {
  const [annualIncome, setAnnualIncome] = useState<number>(500000);
  const [isMainActivity, setIsMainActivity] = useState<boolean>(true);

  const calculations = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const calculatedMonthly = monthlyIncome * HEALTH_INSURANCE_RATE;
    const minMonthly = isMainActivity
      ? MIN_MONTHLY_MAIN
      : MIN_MONTHLY_SECONDARY;
    const monthlyInsurance = Math.max(calculatedMonthly, minMonthly);
    const annualInsurance = monthlyInsurance * 12;

    return {
      monthlyIncome: Math.round(monthlyIncome),
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
          heading: "Zdravotní pojištění",
          secondHeading: "pro OSVČ",
          text: "Spočítejte si, kolik budete platit na zdravotní pojištění. Pojistné se počítá jako 13,5% z vašich příjmů, s minimální sazbou 117 Kč měsíčně.",
          buttonsColumns: 1,
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}
          <div className="bg-white rounded-2xl border-2 border-zinc-200 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bebas mb-8">
              Vaší zdravotní pojištění
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
                    <Info size={16} />
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
                      Sazba (13,5% z příjmu)
                    </p>
                    <p className="text-2xl font-bebas text-secondary">
                      {formatCurrency(calculations.calculatedMonthly)}
                    </p>
                  </div>
                </div>

                <TipBox text="Zdravotní pojištění se počítá z vašeho příjmu v daném měsíci. Pokud máte měsíc s nižšími příjmy, platíte méně pojistného." />
              </div>
            </div>
          </div>

          {/* Informační sekce */}
          <div className="mt-16 flex flex-col gap-8">
            <InfoCard
              icon={<FileText size={32} />}
              title="Co je zdravotní pojištění?"
              description="Zdravotní pojištění je povinný příspěvek na zdravotní péči. Pokud se zaregistrujete jako OSVČ, musíte jej platit."
            />

            <InfoCard
              icon={<BarChart3 size={32} />}
              title="Jak se počítá?"
              description="Pojistné činí 13,5% z měsíčního příjmu, minimálně však 117 Kč za měsíc, i když nemáte příjmy."
            />

            <InfoCard
              icon={<Calendar size={32} />}
              title="Kdy se platí?"
              description="Pojistné se platí měsíčně do 20. dne kalendářního měsíce, který následuje po měsíci, za který se pojistné počítá."
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
