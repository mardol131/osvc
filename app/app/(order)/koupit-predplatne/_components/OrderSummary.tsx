"use client";

import React from "react";
import { servicePrice } from "@/app/_data/pricing";
import Button from "@/app/_components/atoms/Button";

export type OrderFormData = {
  email: string;
  phone: string;
  phonePrefix: string;
};

type Props = {
  selectedActivities: Array<{ name: string; price: number }>;
  onSubmit: (data: OrderFormData) => void;
};

export default function OrderSummary({ selectedActivities, onSubmit }: Props) {
  const activitiesTotal = selectedActivities.reduce(
    (sum, activity) => sum + activity.price,
    0
  );
  const total = servicePrice + activitiesTotal;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      phonePrefix: formData.get("phonePrefix") as string,
    });
  };

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value.replace(/\D/g, "").slice(0, 9);
    input.value = value;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-24 bg-white rounded-2xl border border-zinc-200 p-6 shadow-lg"
    >
      <h3 className="text-2xl text-zinc-800 mb-4">Souhrn objednávky</h3>

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

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-6"></div>

      {/* Kontaktní údaje */}
      <div className="space-y-4 mb-6">
        <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
          Kontaktní údaje
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 mb-2"
          >
            Email <span className="text-secondary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border-2 border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
            placeholder="vas@email.cz"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-700 mb-2"
          >
            Telefon <span className="text-secondary">*</span>
          </label>
          <div className="flex gap-2">
            <select
              name="phonePrefix"
              defaultValue="+420"
              className="rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-800 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300 cursor-pointer bg-white"
            >
              <option value="+420">+420</option>
              <option value="+421">+421</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              onInput={handlePhoneInput}
              className="flex-1 rounded-lg border-2 border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
              placeholder="123 456 789"
              maxLength={9}
              minLength={9}
              pattern="[0-9]{9}"
              required
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-6"></div>

      <div className="flex justify-between items-end mb-6">
        <span className="text-lg font-bold text-zinc-800">Celkem za rok</span>
        <span className="text-3xl font-bold text-secondary">{total} Kč</span>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-secondary to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Přejít k platbě
      </button>

      <p className="text-zinc-500 text-xs text-center mt-4">
        ✓ Funkce aktivní okamžitě po platbě
      </p>
    </form>
  );
}
