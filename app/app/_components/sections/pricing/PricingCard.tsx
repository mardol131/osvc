import { servicePrice } from "@/app/_data/pricing";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  benefits: ReactNode;
};

export default function PricingCard(props: Props) {
  return (
    <div className="relative bg-gradient-to-br from-primary via-zinc-800 to-zinc-900 rounded-2xl md:p-10 p-6 text-textLight flex flex-col gap-8 shadow-2xl overflow-hidden border border-secondary/20">
      {/* Dekorativní gradient overlay */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-tertiary/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <p className="text-secondary mb-5 text-sm font-bold uppercase tracking-wide">
          Roční předplatné
        </p>
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-white">{servicePrice} Kč</h2>
          <span className="text-zinc-400 text-xl">/rok</span>
        </div>
        <p className="text-zinc-300 text-base">
          To je jen <span className="text-secondary font-bold">1 Kč denně</span>{" "}
          – méně než jedno kafe
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent mt-6"></div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">{props.benefits}</div>

      <Link
        target="_blank"
        href={process.env.NEXT_PUBLIC_PAYMENT_LINK!}
        className="relative z-10 text-xl uppercase cursor-pointer text-white font-bold py-4 px-8 bg-gradient-to-r from-secondary via-colorTo to-tertiary rounded-xl flex items-center justify-center hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out shadow-lg"
      >
        Koupit předplatné
      </Link>

      <div className="relative z-10 text-center">
        <p className="text-zinc-400 text-sm">
          ✓ Funkce jsou aktivní okamžitě po platbě
        </p>
      </div>
    </div>
  );
}
