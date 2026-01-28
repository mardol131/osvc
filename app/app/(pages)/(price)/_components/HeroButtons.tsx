"use client";

import Button from "@/app/_components/atoms/Button";
import { servicePrice } from "@/app/_data/pricing";
import { scrollToElement } from "@/app/_functions/scrollToElement";

type Props = {};

export default function HeroButtons({}: Props) {
  return (
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
        onClick={() => {
          scrollToElement("benefitsSection");
        }}
      />
    </>
  );
}
