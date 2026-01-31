import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import TaxesCalculator from "@/app/_components/molecules/TaxesCalculator";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import { DollarSign, TrendingUp } from "lucide-react";

export const metadata = {
  title: "OSVČ365: Odvody OSVČ",
  description:
    "Zjistěte, jaká bude vaše daňová povinnost a kolik zaplatíte na sociálním a zdravotním pojištění jako OSVČ. Kalkulačka odvodů vám pomůže jednoduše spočítat všechny povinné platby a získat přehled o vašich závazcích vůči státu.",
};

export default function page() {
  // JE potřeba přepsat tipBox, bubliny a CTA
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Odvody OSVČ",
          secondHeading: "",
          text: "Zjistěte, jaká bude na konci roku vaše daňová povinnost a celková platba za sociální a zdravotní pojištění.",
          buttonsColumns: 1,
          label: "kalkulačka",
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}

          <TaxesCalculator
            useCostBasedCalculation
            useCostRateOptions
            useDetailedParameters
            useSecondaryActivity
            useEarningsBeforeTaxResult
            useIncomeTaxResult
            useSocialHealthInsuranceResult
            allowToChoseDetailedOptions
            title="Kalkulačka odvodů OSVČ"
          />
          {/* Informační karty */}
          <div className="mt-12 flex flex-col gap-10">
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Co jsou odvody OSVČ?"
              description="Odvody OSVČ zahrnují povinné platby na sociální a zdravotní pojištění a případně daň z příjmů. Každý podnikatel musí tyto částky pravidelně odvádět státu, a to bez ohledu na výši svých příjmů. Výše odvodů se liší podle zvoleného režimu podnikání a dosažených příjmů."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Jak se odvody počítají?"
              description="Výše odvodů OSVČ závisí na zvoleném způsobu zdanění (paušální daň, skutečné nebo paušální výdaje) a na tom, zda podnikatel vykonává hlavní nebo vedlejší činnost. Kalkulačka vám pomůže spočítat, kolik zaplatíte na sociálním a zdravotním pojištění i na dani z příjmů podle vaší konkrétní situace."
            />
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Co hrozí při neplacení odvodů?"
              description="Pokud OSVČ neplatí povinné odvody včas, hrozí jim penále, pokuty a v krajním případě i vymáhání dlužných částek. Je proto důležité mít přehled o svých povinnostech a platit odvody včas. Kalkulačka vám pomůže s orientací v systému odvodů."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Jak vám kalkulačka pomůže?"
              description="Naše kalkulačka odvodů OSVČ vám rychle a jednoduše spočítá, kolik musíte odvádět na sociální a zdravotní pojištění i na dani z příjmů. Stačí zadat základní údaje a ihned získáte přehled o svých povinnostech."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta />
    </>
  );
}
