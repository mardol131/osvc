import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import TaxesCalculator from "@/app/_components/molecules/TaxesCalculator";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import { DollarSign, TrendingUp } from "lucide-react";

export const metadata = {
  title: "OSVČ365: Paušální daň vs. Paušální výdaje",
  description:
    "Porovnejte paušální daň a paušální výdaje pomocí naší kalkulačky a zjistěte, která možnost je pro vás výhodnější.",
};

export default function page() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Paušální daň vs. Paušální výdaje",
          secondHeading: "Která varianta se vám vyplatí?",
          text: "Porovnávejte paušální daň (zjednodušený režim bez DPH) s tradičním režimem paušálních výdajů. Zjistěte, jaký režim je pro vás výhodnější a kolik můžete měsíčně ušetřit.",
          buttonsColumns: 1,
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}

          <TaxesCalculator
            useCostBasedCalculation
            useFlatTaxCalculation
            useCostRateOptions
            useCostRateRange
            useTaxRateOptions
            useDetailedParameters
            useEarningsBeforeTaxResult
            useSocialHealthInsuranceResult
            useIncomeTaxResult
            title="Paušální daň vs. Paušální výdaje"
            tipBox="Paušální daň je vhodná pro jednoduché podnikání bez DPH. Nemusíte podávat daňové přiznání - jen platíte měsíčně. Naopak paušální výdaje se vyplatí, máte-li vyšší skutečné výdaje a chcete si uplatnit daňové slevy."
          />
          {/* Informační karty */}
          <div className="mt-12 flex flex-col gap-10">
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Paušální daň"
              description="Paušální daň je speciální daňový režim určený pro OSVČ, který výrazně zjednodušuje administrativu. Místo složitého vyplňování daňového přiznání a přehledů pro OSSZ a zdravotní pojišťovnu platíte jednou měsíčně fixní částku, která zahrnuje daň z příjmů, sociální i zdravotní pojištění. Tento režim je vhodný pro podnikatele s příjmy do 2 milionů Kč ročně, kteří nejsou plátci DPH a nemají zaměstnance. Paušální daň přináší klid, předvídatelnost a minimum papírování."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Paušální výdaje"
              description="Paušální výdaje představují tradiční způsob, jak si OSVČ mohou snížit základ daně pomocí procentuálního odpočtu z příjmů. Tento režim je vhodný pro podnikatele, kteří mají vyšší skutečné náklady nebo chtějí využít daňové slevy a zvýhodnění. Paušální výdaje umožňují uplatnit slevu na poplatníka, děti či manžela/manželku a jsou flexibilní pro různé typy podnikání. Je však nutné podávat daňové přiznání a přehledy pro OSSZ a zdravotní pojišťovnu."
            />
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Pro koho je paušální daň?"
              description="Paušální daň je ideální volbou pro OSVČ, které mají jednoduché podnikání bez zaměstnanců, jejich roční příjmy nepřesahují 2 miliony Kč a nejsou plátci DPH. Tento režim ocení zejména ti, kteří chtějí minimalizovat administrativu, mít jasně dané měsíční náklady a neřešit složité daňové přiznání. Paušální daň je vhodná i pro začínající podnikatele, kteří preferují jednoduchost a předvídatelnost."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Pro koho jsou paušální výdaje?"
              description="Paušální výdaje se vyplatí OSVČ, které mají vyšší skutečné náklady, chtějí uplatnit daňové slevy nebo mají příjmy nad limitem pro paušální daň. Tento režim je vhodný pro podnikatele, kteří mají různorodé výdaje, zaměstnance nebo kombinují podnikání s jinými příjmy. Paušální výdaje umožňují větší flexibilitu a možnost optimalizace daňové povinnosti podle individuální situace."
            />
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Výhody paušální daně"
              description="Mezi hlavní výhody paušální daně patří jednoduchost, minimum papírování a předvídatelné měsíční náklady. OSVČ nemusí podávat daňové přiznání ani přehledy pro OSSZ a zdravotní pojišťovnu, což šetří čas i nervy. Paušální daň také eliminuje riziko chyb v účetnictví a umožňuje podnikatelům soustředit se na svůj byznys bez zbytečné administrativní zátěže."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Výhody paušálních výdajů"
              description="Paušální výdaje umožňují OSVČ uplatnit různé daňové slevy, například na poplatníka, děti nebo manžela/manželku, a také daňové zvýhodnění. Tento režim je výhodný pro ty, kteří mají vyšší skutečné náklady a chtějí optimalizovat svou daňovou povinnost. Paušální výdaje poskytují větší flexibilitu a možnost kombinace s dalšími příjmy, což je vhodné pro podnikatele s rozmanitými aktivitami."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta />
    </>
  );
}
