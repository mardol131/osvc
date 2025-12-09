"use client";

import React from "react";
import { stripePayment } from "@/app/_data/links";
import Button from "@/app/_components/atoms/Button";
import { scrollToElement } from "@/app/_functions/scrollToElement";
import NumberOfClients from "@/app/_components/blocks/NumberOfClients";

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center md:px-10 px-4 md:py-30 py-20 pt-30 md:pt-50 overflow-hidden">
      {/* Dekorativní pozadí */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-secondary/5 pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full flex flex-col items-center gap-6 text-center max-w-200">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-secondary/10 to-tertiary/10 border border-secondary/30 rounded-full">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          <p className="text-sm font-bold text-primary uppercase tracking-wide">
            Pro OSVČ
          </p>
        </div>

        {/* Hlavní nadpis */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="bg-gradient-to-br from-primary via-primary to-zinc-700 bg-clip-text text-transparent">
            Vy podnikáte. <br />
            My hlídáme byrokracii.
          </h1>
        </div>

        {/* Popisek */}
        <p className="md:text-2xl text-lg text-textP max-w-4xl leading-relaxed">
          Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
          když se něco změní. Už žádné pokuty ani stres z neznámých povinností.{" "}
          <span className="text-secondary font-bold">
            A za rok to stojí jako tři kafe.
          </span>
        </p>

        {/* CTA tlačítka */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-8 w-full max-w-2xl">
          <Button
            text="Koupit za 365 Kč na rok"
            href={stripePayment}
            target="_blank"
          />
          <Button
            variant="black"
            text="Jak to funguje"
            onClick={() => {
              scrollToElement("benefitsSection");
            }}
          />
        </div>

        {/* Social proof */}
        <NumberOfClients />

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-textP">
          <div className="flex items-center gap-2">
            <span className="text-secondary text-lg">✓</span>
            <span>Okamžitý přístup</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary text-lg">✓</span>
            <span>365 Kč na celý rok</span>
          </div>
        </div>
      </div>
    </div>
  );
}
