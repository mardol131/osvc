import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { servicePrice } from "@/app/_data/pricing";

export default function MainServiceBox() {
  return (
    <div className="bg-gradient-to-br from-primary via-zinc-800 to-zinc-900 rounded-2xl p-6 md:p-8 border border-secondary/20 shadow-xl relative overflow-hidden">
      {/* Dekorativní gradient overlay */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <p className="inline-block px-3 py-1 text-xs font-semibold text-white bg-secondary rounded-md mb-3 uppercase  ">
              Hlavní služba
            </p>
            <h3 className="text-2xl md:text-3xl text-white mb-2">
              Předplatné služby OSVČ365
            </h3>
            <p className="text-zinc-300 text-base">
              Kompletní hlídání pravidelných a nových povinností pro OSVČ skrze
              email a SMS zpráv, upozorňování na blížící se termíny a informace
              o změnách.
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-3xl md:text-4xl font-semibold text-white">
              {servicePrice} Kč
            </p>
            <p className="text-zinc-400 text-sm mt-1">/rok</p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent my-4"></div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-emerald-500 text-lg mt-1 flex-shrink-0" />
            <p className="text-zinc-200 text-lg">Vše důležité hlídáme za Vás</p>
          </div>
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-emerald-500 text-lg mt-1 flex-shrink-0" />
            <p className="text-zinc-200 text-lg">Připomínky e-mailem i SMS</p>
          </div>
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-emerald-500 text-lg mt-1 flex-shrink-0" />
            <p className="text-zinc-200 text-lg">Měsíční přehledy změn</p>
          </div>
          <div className="flex items-start gap-2">
            <FaCheckCircle className="text-emerald-500 text-lg mt-1 flex-shrink-0" />
            <p className="text-zinc-200 text-lg">
              Upozorňování na blížící se termíny
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
