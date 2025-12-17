import React from "react";
import { Metadata } from "next";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import HeadingLeft from "@/app/_components/blocks/headings/HeadingLeft";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import EntitiesWithoutLegalAdvice from "@/app/_components/sections/EntitiesWithoutLegalAdvice";
import Benefits from "@/app/_components/sections/Benefits";
import { benefitsData } from "@/app/_data/benefitsData";
import PricingTextAndBubble from "@/app/_components/sections/pricing/PricingTextAndBubble";
import Faq from "@/app/_components/sections/faq/Faq";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import Button from "@/app/_components/atoms/Button";
import { stripePayment } from "@/app/_data/links";
import { servicePrice } from "@/app/_data/pricing";
import { FiAlertTriangle, FiClock, FiShield } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { BsLightning } from "react-icons/bs";
import Comparison from "@/app/_components/sections/Comparison";
import Reasons from "@/app/_components/sections/Reasons";
import Facts from "@/app/_components/sections/Facts";

export const metadata: Metadata = {
  title: "Proč dává smysl hlídat si povinnosti OSVČ? | OSVČ Asistent",
  description:
    "Zjistěte, proč se vyplatí investovat do asistenta pro OSVČ. Ušetříte čas, vyhnete se pokutám a budete mít klid na podnikání. Roční ochrana za cenu tří káv.",
  keywords: [
    "OSVČ povinnosti",
    "daňové termíny",
    "pokuty OSVČ",
    "asistent pro živnostníky",
    "správa OSVČ",
    "živnostenské povinnosti",
    "připomínky termínů",
    "daňové přiznání OSVČ",
  ],
  openGraph: {
    title: "Proč dává smysl hlídat si povinnosti OSVČ?",
    description:
      "Ušetřete čas i peníze. Vyhnete se pokutám a budete mít klid na podnikání.",
    type: "website",
  },
};

export default function DavaToSmyslPage() {
  return (
    <main className="flex flex-col">
      {/* Hero sekce */}
      <HeroMidAlign
        options={{
          heading: "Cena za tři kafe.",
          secondHeading: "na celý rok.",
          text: " Sledujeme zákony, připomínáme důležité termíny a dáváme Vám věsdět, když se něco změní. Už žádné pokuty ani stres z neznámých povinností.",
          buttonsColumns: 1,
        }}
      />

      {/* Sekce 1: Realita OSVČ */}
      <Facts />

      {/* Sekce 2: Statistika bez účetního */}
      <EntitiesWithoutLegalAdvice />

      {/* Sekce 3: Proč to dává ekonomický smysl */}
      <Comparison />

      {/* Sekce 4: Co získáte - Benefits */}
      <Benefits benefitsData={benefitsData} />

      {/* Sekce 5: Další důvody proč to dává smysl */}
      <Reasons />

      {/* Sekce 6: Pricing */}
      <div id="pricing">
        <PricingTextAndBubble
          text="Jedna koruna denně vám zajistí klid na celý rok. Žádné skryté poplatky, žádné překvapení."
          heading={
            <>
              Jedna koruna denně.
              <br /> Celý rok ochrany.
            </>
          }
          subheading="Ceník"
          direction="horizontal"
        />
      </div>

      {/* Sekce 7: FAQ */}
      <Faq />

      {/* Finální CTA */}
    </main>
  );
}

// Pomocné komponenty
