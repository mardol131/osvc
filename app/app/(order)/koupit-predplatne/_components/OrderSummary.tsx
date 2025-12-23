"use client";

import React from "react";
import { servicePrice } from "@/app/_data/pricing";
import Button from "@/app/_components/atoms/Button";

type Props = {
  selectedActivities: Array<{ name: string; price: number }>;
  onCheckout: () => void;
};

export default function OrderSummary({
  selectedActivities,
  onCheckout,
}: Props) {
  const activitiesTotal = selectedActivities.reduce(
    (sum, activity) => sum + activity.price,
    0
  );
  const total = servicePrice + activitiesTotal;

  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-zinc-200 p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-zinc-800 mb-4">
        Souhrn objednávky
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
          <span className="text-zinc-700">Předplatné OSVČ365</span>
          <span className="font-semibold text-zinc-800">{servicePrice} Kč</span>
        </div>

        {selectedActivities.length > 0 && (
          <>
            <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wide pt-2">
              Předměty podnikání
            </div>
            {selectedActivities.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-zinc-600">{activity.name}</span>
                <span className="font-semibold text-secondary">
                  +{activity.price} Kč
                </span>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-4"></div>

      <div className="flex justify-between items-end mb-6">
        <span className="text-lg font-bold text-zinc-800">Celkem za rok</span>
        <span className="text-3xl font-bold text-secondary">{total} Kč</span>
      </div>

      <Button
        text="Přejít k platbě"
        onClick={onCheckout}
        variant="gold"
        className="w-full"
      />

      <p className="text-zinc-500 text-xs text-center mt-4">
        ✓ Funkce aktivní okamžitě po platbě
      </p>
    </div>
  );
}
