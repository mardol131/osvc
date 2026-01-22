"use client";

import React, { useState, useRef, useEffect } from "react";
import { servicePrice } from "@/app/_data/pricing";
import { OrderFormData, SelectedActivities } from "./OrderSummary";
import Button from "@/app/_components/atoms/Button";
import CustomCheckbox from "@/app/_components/atoms/CustomCheckbox";

type Props = {
  selectedActivities: SelectedActivities;
  onSubmit: (data: OrderFormData) => void;
  isSubmitting?: boolean;
};

export default function OrderSummaryDesktop({
  selectedActivities,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const [phonePrefix, setPhonePrefix] = useState("420");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activitiesTotal = selectedActivities.reduce(
    (sum, activity) => sum + activity.price,
    0,
  );
  const total = servicePrice + activitiesTotal;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      phonePrefix: phonePrefix,
      terms: formData.get("terms") === "true",
      marketing: formData.get("marketing") === "true",
    });
  };

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value.replace(/\D/g, "").slice(0, 9);
    input.value = value;
  };

  // Zavřít dropdown při kliknutí mimo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-lg"
    >
      <h3 className="text-2xl text-zinc-800 mb-4">Souhrn objednávky</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
          <p className="text-zinc-700">Předplatné OSVČ365</p>
          <p className="font-semibold text-zinc-800">{servicePrice} Kč</p>
        </div>

        {selectedActivities.length > 0 && (
          <>
            <p className="text-base font-semibold uppercase pt-2">
              Předměty podnikání
            </p>
            {selectedActivities.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <p className="text-zinc-600">{activity.label}</p>
                <p className="font-semibold text-secondary">
                  +{activity.price} Kč
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {selectedActivities.length > 0 && (
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-6"></div>
      )}

      {/* Kontaktní údaje */}
      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 mb-2"
          >
            Email
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
            Telefon
          </label>
          <div className="flex gap-2">
            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-20 shrink-0 rounded-lg border-2 border-zinc-200 px-3 py-2.5 text-sm text-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300 cursor-pointer bg-white flex items-center justify-between"
              >
                <p>+{phonePrefix}</p>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-20 bg-white border-2 border-zinc-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setPhonePrefix("420");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-100 transition-colors ${
                      phonePrefix === "420"
                        ? "bg-secondary/10 text-secondary"
                        : "text-zinc-800"
                    }`}
                  >
                    +420
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhonePrefix("421");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-100 transition-colors ${
                      phonePrefix === "421"
                        ? "bg-secondary/10 text-secondary"
                        : "text-zinc-800"
                    }`}
                  >
                    +421
                  </button>
                </div>
              )}
            </div>

            <input
              type="tel"
              id="phone"
              name="phone"
              onInput={handlePhoneInput}
              className="flex-1 min-w-0 rounded-lg border-2 border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
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
        <p className="text-lg font-bold text-zinc-800">Celkem za rok</p>
        <p className="text-3xl font-bold text-secondary">{total} Kč</p>
      </div>

      {/* Checkbox pro obchodní podmínky a GDPR */}
      <div className="mb-6 flex flex-col gap-3">
        <CustomCheckbox
          name="terms"
          checked={termsChecked}
          onChange={setTermsChecked}
          required
          label={
            <>
              Souhlasím s{" "}
              <a
                href="/obchodni-podminky.pdf"
                target="_blank"
                className="text-secondary hover:underline font-medium"
              >
                obchodními podmínkami
              </a>{" "}
              a{" "}
              <a
                href="/gdpr.pdf"
                target="_blank"
                className="text-secondary hover:underline font-medium"
              >
                zpracováním osobních údajů
              </a>
              .
            </>
          }
        />
        <CustomCheckbox
          name="marketing"
          checked={marketingChecked}
          onChange={setMarketingChecked}
          label="Chci dostávat marketingovou komunikaci"
        />
      </div>

      <Button
        htmlType="submit"
        text="Přejít k platbě"
        variant="gold"
        className="w-full"
        loading={isSubmitting}
      />
    </form>
  );
}
