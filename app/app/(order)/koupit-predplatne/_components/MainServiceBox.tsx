import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { servicePrice } from "@/app/_data/pricing";
import { ActivityGroup } from "@/app/_data/businessActivities";

export default function MainServiceBox({
  name,
  description,
  items,
  price,
}: ActivityGroup) {
  return (
    <div className="bg-primary rounded-xl p-5 md:p-6 border-l-4 border-secondary shadow-md">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
          <div className="flex-1">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold text-white bg-secondary rounded-md mb-2 uppercase">
              Základní služba
            </span>
            <h3 className="text-white mb-2">{name}</h3>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="text-3xl text-white">{price} Kč</p>
            <p className="text-zinc-400 text-sm">/rok</p>
          </div>
        </div>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="border-t border-zinc-700 pt-4 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />
            <p className="text-zinc-200 text-base md:text-lg">{item.item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
