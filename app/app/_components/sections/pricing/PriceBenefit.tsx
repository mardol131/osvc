import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  text: string;
};

export default function PriceBenefit({ text }: Props) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-1">
        <FaCheckCircle className="text-emerald-500 text-2xl group-hover:text-emerald-300 transition-colors duration-200" />
      </div>
      <p className="text-zinc-100 text-base leading-relaxed">{text}</p>
    </div>
  );
}

type UpsellBenefitProps = {
  text: string;
  badge?: string;
};

export function UpsellBenefit({ text, badge }: UpsellBenefitProps) {
  return (
    <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border-2 border-secondary/30 hover:border-secondary/50 transition-all duration-300">
      {badge && (
        <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-secondary rounded-md mb-3 uppercase">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-4 group">
        <div className="flex-shrink-0 mt-1">
          <FaCheckCircle className="text-secondary text-2xl group-hover:text-secondary/80 transition-colors duration-200" />
        </div>
        <div className="flex-1">
          <p className="text-zinc-50 text-base leading-relaxed">{text}</p>
          <p className="text-zinc-400 text-sm mt-2">
            Sledování povinností specifických pro váš obor (IT služby,
            marketing, obchodní činnost, výroba a další).{" "}
            <span className="text-white">Lze přidat v průběhu platby.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export const BenefitsPoints = (
  <>
    <PriceBenefit text="Vše důležité hlídáme za Vás" />
    <PriceBenefit text="Připomínky e-mailem i SMS" />
    <PriceBenefit text="Měsíční přehledy změn" />
    <PriceBenefit text="Odkazy na formuláře a oficiální zdroje" />
    <PriceBenefit text="Sdílený kalendář s důležitými termíny" />
    <UpsellBenefit
      text="Sledování specifického předmětu podnikání"
      badge="Chcete být konkrétní?"
    />
  </>
);
