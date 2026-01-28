import NumberOfClients from "@/app/_components/blocks/NumberOfClients";
import OneStringInputCta from "../../../_components/blocks/OneStringInputCta";
import EntitiesWithoutLegalAdvice from "../../../_components/sections/EntitiesWithoutLegalAdvice";
import HeroMidAlign from "../../../_components/sections/hero/HeroMidAlign";
import PricingTextAndBubble from "../../../_components/sections/pricing/PricingTextAndBubble";
import HeroButtons from "../_components/HeroButtons";
import Comparison from "@/app/_components/sections/Comparison";
import Button from "@/app/_components/atoms/Button";
import { servicePrice } from "@/app/_data/pricing";

export default async function page() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Cena za tři kafe.",
          secondHeading: "na celý rok.",
          text: " Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět, když se něco změní. Už žádné pokuty ani stres z neznámých povinností.",
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
      <OneStringInputCta
        options={{
          heading: "Ještě se na to necítíte? Zanechte nám svůj email.",
          subheading:
            "Budeme Vás informovat pouze o novinkách v naší službě, žádný zbytečný marketing.",
          dataDestination: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ecomail/news`,
          buttonText: "Odebírat novinky",
          inputType: "email",
          placeholder: "Zde zadejte email",
        }}
      />
    </>
  );
}
