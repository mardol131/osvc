import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import TaxesCalculator from "@/app/_components/molecules/TaxesCalculator";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import { DollarSign, TrendingUp } from "lucide-react";

export const metadata = {
  title: "OSVČ365: Daň z příjmu",
  description:
    "Zjistěte, jaká bude vaše daňová povinnost jako OSVČ na konci roku. Kalkulačka daně z příjmu vám pomůže jednoduše spočítat, kolik zaplatíte na dani, a získat přehled o všech povinnostech i možnostech úspor",
};

export default function page() {
  // JE potřeba přepsat tipBox, bubliny a CTA
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Daň z příjmu OSVČ",
          secondHeading: "",
          text: "Zjistěte, jaká bude na konci roku vaše daňová povinnost.",
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
            allowToChoseDetailedOptions
            title="Kalkulačka daně z příjmu"
          />
          {/* Informační karty */}
          <div className="mt-12 flex flex-col gap-10">
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Co je daň z příjmu OSVČ?"
              description="Daň z příjmu OSVČ je povinná platba, kterou podnikatelé odvádějí z dosažených příjmů po odečtení nákladů. Výše daně závisí na zvoleném způsobu uplatnění výdajů a na celkovém zisku."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Jak se daň počítá?"
              description="Výpočet daně z příjmu OSVČ vychází z rozdílu mezi příjmy a výdaji. Výdaje lze uplatnit buď skutečné, nebo paušální procentem z příjmů. Kalkulačka vám pomůže zjistit, kolik zaplatíte na dani podle vaší situace."
            />
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Kdo musí platit daň z příjmu?"
              description="Daň z příjmu musí platit všechny OSVČ, které dosáhly zdanitelných příjmů. Výjimky existují pouze v některých specifických případech, například při nízkých příjmech pod zákonný limit."
            />
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Co hrozí při neplacení daně?"
              description="Pokud OSVČ neodvede daň z příjmu včas, hrozí jí penále, pokuty a v krajním případě i vymáhání dlužné částky. Je proto důležité mít přehled o svých povinnostech a platit daň včas."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Jak vám kalkulačka pomůže?"
              description="Naše kalkulačka daně z příjmu pro OSVČ vám rychle a jednoduše spočítá, kolik musíte odvést na dani. Stačí zadat základní údaje a ihned získáte přehled o svých povinnostech."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta />
    </>
  );
}
