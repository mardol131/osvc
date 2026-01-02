import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { servicePrice } from "@/app/_data/pricing";

export default function MainServiceBox() {
  return (
    <div className="bg-primary rounded-xl p-5 md:p-6 border-l-4 border-secondary shadow-md">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
          <div className="flex-1">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold text-white bg-secondary rounded-md mb-2 uppercase">
              Základní služba
            </span>
            <h3 className="text-white mb-2">Předplatné služby OSVČ365</h3>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="text-3xl text-white">{servicePrice} Kč</p>
            <p className="text-zinc-400 text-sm">/rok</p>
          </div>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
          Kompletní hlídání pravidelných a nových povinností pro OSVČ skrze
          email a SMS zpráv, upozorňování na blížící se termíny a informace o
          změnách.
        </p>
      </div>

      <div className="border-t border-zinc-700 pt-4 space-y-2">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />
          <p className="text-zinc-200 text-base md:text-lg">
            Vše důležité hlídáme za Vás
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />
          <p className="text-zinc-200 text-base md:text-lg">
            Připomínky e-mailem i SMS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />
          <p className="text-zinc-200 text-base md:text-lg">
            Měsíční přehledy změn
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />
          <p className="text-zinc-200 text-base md:text-lg">
            Upozorňování na blížící se termíny
          </p>
        </div>
      </div>
    </div>
  );
}
