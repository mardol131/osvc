import React from "react";
import HeroWithImage from "../_components/global/hero/HeroWithImage";
import heroImage from "../../public/SMS.png";

type Props = {};

export default function page({}: Props) {
  return (
    <HeroWithImage
      options={{
        image: { src: heroImage, alt: "phone" },
        heading: "My hlídáme byrokracii.",
        text: ` Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
          když se něco změní. Už žádné pokuty ani stres z neznámých povinností.`,
        buttons: [
          {
            type: "orange",
            text: "Koupit za 365 Kč na rok",
            href: process.env.NEXT_PUBLIC_PAYMENT_LINK
              ? process.env.NEXT_PUBLIC_PAYMENT_LINK
              : "",
          },
          {
            type: "black",
            id: "benefitsSection",
            text: "Jak to funguje",
          },
        ],
      }}
    />
  );
}
