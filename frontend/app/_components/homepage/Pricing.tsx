import { servicePrice } from "@/app/_data/pricing";
import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {};

function PriceBenefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <FaCheckCircle className="text-secondary text-2xl" />
      <p className=" text-lg">{text}</p>
    </div>
  );
}

export default function Pricing({}: Props) {
  return (
    <div className=" min-h-200 flex items-center justify-center px-10  py-30">
      <div className="max-w-wrapper w-full grid grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-secondary font-bold uppercase">Ceník</p>
            <h2 className="">Jedna cena. Celý rok ochrany.</h2>
            <p className="text-lg text-textP">
              Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
              když se něco změní. Už žádné pokuty ani stres z neznámých
              povinností.
            </p>{" "}
          </div>
        </div>
        <div className="bg-primary rounded-lg p-10 text-textLight flex flex-col  gap-10">
          <div>
            <h3>Cena</h3>
            <p className="text-5xl font-bebas">{servicePrice} Kč za rok</p>
            <p className="">(Zhruba tři kávy)</p>
            <div className="h-[2px] bg-white/30 mt-2"></div>
          </div>
          <div className=" flex flex-col gap-3">
            <PriceBenefit text="Nějaká výhoda produktu" />
            <PriceBenefit text="Tady se dá vypsat další výhoda" />
            <PriceBenefit text="Pomůže Vám to i s něším jiným" />
            <PriceBenefit text="Budeme vám posílaa pravidelné SMS zprávy a emaily" />
            <PriceBenefit text="Už něbudete platit žádné pokuty" />
          </div>
          <button className="text-2xl uppercase text-primary font-semibold py-3 px-6 bg-textLight  rounded-lg flex items-center justify-center">
            Koupit
          </button>
        </div>
      </div>
    </div>
  );
}
