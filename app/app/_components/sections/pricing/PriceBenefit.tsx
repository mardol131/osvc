import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  text: string;
};

export default function PriceBenefit({ text }: Props) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-1">
        <FaCheckCircle className="text-emerald-500 text-2xl group-hover:text-tertiary transition-colors duration-200" />
      </div>
      <p className="text-zinc-100 text-base leading-relaxed">{text}</p>
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
  </>
);
