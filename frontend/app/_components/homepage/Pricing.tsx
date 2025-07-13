import { servicePrice } from "@/app/_data/pricing";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function PriceBenefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <FaCheckCircle className="text-emerald-500 text-2xl" />
      <p className=" text-lg">{text}</p>
    </div>
  );
}

export default function Pricing() {
  return (
    <div
      id="price"
      className=" min-h-200 flex items-center justify-center md:px-10 px-4 md:py-30 py-20"
    >
      <div className="max-w-wrapper w-full md:grid flex flex-col grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-secondary font-bold uppercase">Ceník</p>
            <h2 className="">
              Jedna koruna denně.
              <br /> Celý rok ochrany.
            </h2>
            <p className="text-lg text-textP">
              Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
              když se něco změní. Už žádné pokuty ani stres z neznámých
              povinností.
            </p>{" "}
          </div>
        </div>
        <div className="bg-primary rounded-lg md:p-10 p-4 text-textLight flex flex-col  gap-10 shadow-xl">
          <div>
            <h3>Cena</h3>
            <p className="text-5xl font-bebas">{servicePrice} Kč za rok</p>
            <p className="text-sm mt-2">(Zhruba tři kávy)</p>
            <div className="h-[2px] bg-white/30 mt-2"></div>
          </div>
          <div className=" flex flex-col gap-3">
            <PriceBenefit text="Vše důležité hlídáme za Vás" />
            <PriceBenefit text="Připomínky e-mailem i SMS" />
            <PriceBenefit text="Měsíční přehledy změn" />
            <PriceBenefit text="Odkazy na formuláře a oficiální zdroje" />
            <PriceBenefit text="Sdílený kalendář s důležitými termíny" />
          </div>
          <a
            href={process.env.NEXT_PUBLIC_PAYMENT_LINK}
            className="text-2xl uppercase text-primary font-semibold py-3 px-6 bg-textLight  rounded-lg flex items-center justify-center"
          >
            Koupit
          </a>
        </div>
      </div>
    </div>
  );
}
