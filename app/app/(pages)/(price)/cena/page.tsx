import Button from "@/app/_components/atoms/Button";
import Comparison from "@/app/_components/sections/Comparison";
import { servicePrice } from "@/app/_data/pricing";
import OneStringInputCta from "../../../_components/blocks/OneStringInputCta";
import EntitiesWithoutLegalAdvice from "../../../_components/sections/EntitiesWithoutLegalAdvice";
import HeroMidAlign from "../../../_components/sections/hero/HeroMidAlign";
import PricingTextAndBubble from "../../../_components/sections/pricing/PricingTextAndBubble";

export const metadata = {
  title: "Ceník služby",
  description:
    "Aktuální ceník služby OSVČ365. Přehled roční ceny a srovnání s běžnými náklady na správu podnikatelských povinností. Informace o tom, co je v ceně zahrnuto a jaké výhody služba nabízí.",
};

export default async function page() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Cena za tři kafe.",
          secondHeading: "na celý rok.",
          text: "Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět, když se něco změní. Už žádné pokuty ani stres z neznámých povinností.",
          buttonsColumns: 1,
          buttons: (
            <>
              <Button
                variant="gold"
                text={`Koupit za ${servicePrice} Kč na rok`}
                size="md"
                href={"/koupit-predplatne"}
              />
              <Button
                text="Jak to funguje"
                variant="black"
                size="md"
                href="/#benefitsSection"
              />
            </>
          ),
        }}
      />
      <PricingTextAndBubble
        subheading="Kolik to stojí"
        heading="Jedna koruna denně. Celý rok ochrany."
        text="Každý účetní a daňový poradce ví prakticky to stejné. Proč by mělo sto lidí platit stokrát za jedny informace? My dáváme informace na jedno místo a automaticky Vás upozorňujeme na případné problémy nebo nové povinnosti. Lidsky a přímo k věci."
        direction="horizontal"
      />
      <EntitiesWithoutLegalAdvice />
      <Comparison />
      <OneStringInputCta />
    </>
  );
}
