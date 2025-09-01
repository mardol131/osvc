import React from "react";
import SectionWrapper from "../_components/global/wrappers/SectionWrapper";
import HeroWithImage from "../_components/global/hero/HeroWithImage";
import heroImage from "../../public/SMS.png";
import { stripePayment } from "../_data/links";
import HeroMidAlign from "../_components/global/hero/HeroMidAlign";
import LinkButton from "../_components/global/buttons/LinkButton";
import ScrollButton from "../_components/global/buttons/ScrollButton";
import NumberOfClients from "../_components/global/socialProof/NumberOfClients";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <div></div>
      <SectionWrapper
        levelTwo={{
          className:
            "items-center flex flex-col items-center justify-center text-center",
          width: "max-w-200",
        }}
      >
        <HeroMidAlign
          options={{
            heading: "Cena za tři kafe.",
            secondHeading: "na celý rok.",
            text: " Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět, když se něco změní. Už žádné pokuty ani stres z neznámých povinností.",
            buttons: (
              <>
                <LinkButton
                  options={{
                    color: "orange",
                    text: "Koupit za 365 Kč na rok",
                    size: "large",
                    href: { href: stripePayment, target: "_blank" },
                    textAlign: "end",
                  }}
                />
                <ScrollButton
                  id="benefitsSection"
                  options={{
                    color: "black",
                    text: "Jak to funguje",
                    size: "large",
                    textAlign: "center",
                  }}
                />
              </>
            ),
            socialProof: <NumberOfClients />,
          }}
        />
      </SectionWrapper>
    </>
  );
}
