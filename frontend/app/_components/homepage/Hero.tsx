import React from "react";
import { stripePayment } from "@/app/_data/links";
import ScrollButton from "../global/buttons/ScrollButton";
import LinkButton from "../global/buttons/LinkButton";
import NumberOfPeopleSigned from "../global/socialProof/NumberOfClients";

export default function Hero() {
  return (
    <div className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20 pt-30 md:pt-60">
      <div className=" w-full flex flex-col items-center gap-5 text-center max-w-200">
        <div className="flex flex-col items-center">
          <h1 className="">
            Vy podnikáte. <br />
            My hlídáme byrokracii.
          </h1>
        </div>
        <p className="md:text-2xl text-lg text-textP">
          Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
          když se něco změní. Už žádné pokuty ani stres z neznámých povinností.{" "}
          <span className="underline">A za rok to stojí jako tři kafe.</span>
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
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
        </div>
        <NumberOfPeopleSigned />
      </div>
    </div>
  );
}
