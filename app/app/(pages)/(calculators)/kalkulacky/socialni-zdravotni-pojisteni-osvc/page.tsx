import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import TaxesCalculator from "@/app/_components/molecules/TaxesCalculator";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import { DollarSign, TrendingUp } from "lucide-react";

export const metadata = {
  title: "OSVČ365: Sociální a zdravotní pojištění OSVČ",
  description:
    "Zjistěte, kolik musíte jako OSVČ odvádět na sociálním a zdravotním pojištění. Kalkulačka vám pomůže rychle spočítat měsíční i roční povinné platby a získat přehled o vašich závazcích vůči státu.",
};

export default function page() {
  // JE potřeba přepsat tipBox, bubliny a CTA
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Sociální a zdravotní pojištění pro OSVČ",
          secondHeading: "",
          text: "Zjistěte, jaká bude na konci roku vaše celková platba za sociální a zdravotní pojištění. Naše kalkulačka vám pomůže rychle a přesně spočítat vaše povinnosti na základě vašich příjmů.",
          buttonsColumns: 1,
          label: "kalkulačka",
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}

          <TaxesCalculator
            useSecondaryActivity
            useCostBasedCalculation
            useCostRateOptions
            useEarningsBeforeTaxResult
            useSocialHealthInsuranceResult
            title="Kalkulačka sociálního a zdravotního pojištění pro OSVČ"
          />
          {/* Informační karty */}
          <div className="mt-12 flex flex-col gap-10">
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Co je sociální a zdravotní pojištění?"
              description="Sociální a zdravotní pojištění jsou povinné platby, které musí OSVČ pravidelně odvádět státu. Zajišťují přístup ke zdravotní péči a budoucímu důchodu. Výše těchto odvodů závisí na typu činnosti a dosažených příjmech."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Jak se odvody počítají?"
              description="Výše sociálního a zdravotního pojištění se odvíjí od minimálních záloh a skutečných příjmů OSVČ. Kalkulačka vám pomůže spočítat, kolik musíte měsíčně a ročně odvádět podle vaší situace."
            />
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Co hrozí při neplacení?"
              description="Pokud OSVČ neplatí sociální nebo zdravotní pojištění včas, hrozí jim penále, pokuty a v krajním případě i vymáhání dlužných částek. Je proto důležité mít přehled o svých povinnostech a platit odvody včas."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Jak vám kalkulačka pomůže?"
              description="Naše kalkulačka sociálního a zdravotního pojištění pro OSVČ vám rychle a jednoduše spočítá, kolik musíte odvádět. Stačí zadat základní údaje a ihned získáte přehled o svých povinnostech."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta />
    </>
  );
}
