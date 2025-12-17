"use client";

import Button from "@/app/_components/atoms/Button";
import { stripePayment } from "@/app/_data/links";
import { servicePrice } from "@/app/_data/pricing";
import { scrollToElement } from "@/app/_functions/scrollToElement";
import React from "react";

type Props = {};

export default function HeroButtons({}: Props) {
  return (
    <>
      {" "}
      <Button
        variant="gold"
        text={`Koupit za ${servicePrice} Kč na rok`}
        size="md"
        href={stripePayment}
        target="_blank"
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
