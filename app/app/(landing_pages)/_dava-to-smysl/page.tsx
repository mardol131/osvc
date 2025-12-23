import Benefits from "@/app/_components/sections/Benefits";
import Comparison from "@/app/_components/sections/Comparison";
import EntitiesWithoutLegalAdvice from "@/app/_components/sections/EntitiesWithoutLegalAdvice";
import Facts from "@/app/_components/sections/Facts";
import Reasons from "@/app/_components/sections/Reasons";
import Faq from "@/app/_components/sections/faq/Faq";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import PricingTextAndBubble from "@/app/_components/sections/pricing/PricingTextAndBubble";
import { benefitsData } from "@/app/_data/benefitsData";
import { Metadata } from "next";

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
