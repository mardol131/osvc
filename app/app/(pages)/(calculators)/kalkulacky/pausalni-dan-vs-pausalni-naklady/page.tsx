import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import TaxesCalculator from "@/app/_components/molecules/TaxesCalculator";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import { DollarSign, TrendingUp } from "lucide-react";

export default function FlatTaxVsCostCalculator() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Paušální daň vs. Paušální výdaje",
          secondHeading: "Která varianta se vám vyplatí?",
          text: "Porovnávejte paušální daň (zjednodušený režim bez DPH) s tradičním režimem paušálních výdajů. Zjistěte, kolik Kč si každý měsíc ušetříte.",
          buttonsColumns: 1,
        }}
      />

      <SectionWrapper>
        <div className="w-full max-w-3xl mx-auto">
          {/* Kalkulátor */}

          <TaxesCalculator modes={["flatTax", "costBased"]} />
          {/* Informační karty */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <InfoCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Paušální daň"
              description="Zjednodušený režim - měsíční fixní platba, bez podávání přiznání, bez DPH, vhodné do 2 mil. Kč/rok."
            />
            <InfoCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Paušální výdaje"
              description="Tradičnější režim - počítá se procento výdajů, podání přiznání, možnost slev, lepší pro vyšší příjmy."
            />
          </div>
        </div>
      </SectionWrapper>

      <OneStringInputCta
        options={{
          heading: "Máte dotazy k daňovému plánování?",
          subheading:
            "Pošlete nám svou e-mailovou adresu a my vám pošleme podrobný průvodce.",
          buttonText: "Poslat",
          inputType: "email",
          dataDestination: "/api/subscribe",
          placeholder: "Vaš e-mail",
        }}
      />
    </>
  );
}
