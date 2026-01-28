"use client";

import React, { useEffect } from "react";
import { servicePrice } from "@/app/_data/pricing";
import { OrderFormData, SelectedActivities } from "./OrderSummary";
import Button from "@/app/_components/atoms/Button";
import CustomCheckbox from "@/app/_components/atoms/CustomCheckbox";

type Props = {
  selectedActivities: SelectedActivities;
  onSubmit: (data: OrderFormData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting?: boolean;
};

export default function OrderSummaryMobile({
  selectedActivities,
  onSubmit,
  isOpen,
  onOpenChange,
  isSubmitting = false,
}: Props) {
  const [termsChecked, setTermsChecked] = React.useState(false);
  const [marketingChecked, setMarketingChecked] = React.useState(false);

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
      phonePrefix: formData.get("phonePrefix") as string,
      terms: formData.get("terms") === "true",
      marketing: formData.get("marketing") === "true",
    });
  };

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value.replace(/\D/g, "").slice(0, 9);
    input.value = value;
  };

  // Zabránit scrollování pozadí, když je modal otevřený
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Zavřít při stisku ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onOpenChange]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-50 bg-black/80 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        className={`
          fixed left-4 right-4 top-4 bottom-4 z-50
          bg-white rounded-2xl border border-zinc-200 shadow-lg
          transition-opacity duration-300
          flex flex-col
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Hlavička - sticky */}
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 rounded-t-2xl border-b border-zinc-100 flex justify-between items-center">
          <h3 className="text-2xl text-zinc-800">Souhrn objednávky</h3>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-zinc-500 hover:text-zinc-700 p-2 -mr-2 transition-colors"
            aria-label="Zavřít"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Scrollovatelný obsah */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-3 mb-4 mt-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
              <span className="text-zinc-700">Předplatné OSVČ365</span>
              <span className="font-semibold text-zinc-800">
                {servicePrice} Kč
              </span>
            </div>

            {selectedActivities.length > 0 && (
              <>
                <div className="text-base font-semibold text-zinc-500 uppercase tracking-wide pt-2">
                  Předměty podnikání
                </div>
                {selectedActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-base"
                  >
                    <span className="text-zinc-600">{activity.label}</span>
                    <span className="font-semibold text-secondary">
                      +{activity.price} Kč
                    </span>
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
            <div className="text-base font-semibold uppercase tracking-wide">
              Kontaktní údaje
            </div>

            <div>
              <label
                htmlFor="email-mobile"
                className="block text-base font-medium text-zinc-700 mb-2"
              >
                Email <span className="text-secondary">*</span>
              </label>
              <input
                type="email"
                id="email-mobile"
                name="email"
                className="w-full rounded-lg border-2 border-zinc-200 px-4 py-2.5 text-base text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
                placeholder="vas@email.cz"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone-mobile"
                className="block text-base font-medium text-zinc-700 mb-2"
              >
                Telefon <span className="text-secondary">*</span>
              </label>
              <div className="flex gap-2">
                <div className="border-2 border-zinc-200 rounded-lg px-2 flex items-center justify-center">
                  <select
                    name="phonePrefix"
                    defaultValue="+420"
                    className="w-16 shrink-0 rounded-lg text-base text-zinc-800 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300 cursor-pointer bg-white"
                  >
                    <option value="+420">+420</option>
                    <option value="+421">+421</option>
                  </select>
                </div>

                <input
                  type="tel"
                  id="phone-mobile"
                  name="phone"
                  onInput={handlePhoneInput}
                  className="flex-1 min-w-0 rounded-lg border-2 border-zinc-200 px-4 py-2.5 text-base text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
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
            <span className="text-lg font-bold text-zinc-800">
              Celkem za rok
            </span>
            <span className="text-3xl font-bold text-secondary">
              {total} Kč
            </span>
          </div>

          {/* Checkbox pro obchodní podmínky a GDPR */}
          <div className="mb-6 flex flex-col gap-3">
            <CustomCheckbox
              name="terms"
              checked={termsChecked}
              onChange={setTermsChecked}
              required
              label={
                <span className="text-base text-zinc-600 leading-relaxed">
                  Souhlasím s{" "}
                  <a
                    href="/obchodni-podminky"
                    target="_blank"
                    className="text-secondary hover:underline font-medium"
                  >
                    obchodními podmínkami
                  </a>{" "}
                  a{" "}
                  <a
                    href="/gdpr"
                    target="_blank"
                    className="text-secondary hover:underline font-medium"
                  >
                    zpracováním osobních údajů
                  </a>
                  .
                </span>
              }
            />
            <CustomCheckbox
              name="marketing"
              checked={marketingChecked}
              onChange={setMarketingChecked}
              label={
                <span className="text-base text-zinc-600 leading-relaxed">
                  Chci dostávat marketingovou komunikaci
                </span>
              }
            />
          </div>

          <div className="bg-white w-full pt-4 rounded-b-2xl border-t pb-5 border-zinc-100">
            <Button
              variant="gold"
              text="Přejít k platbě"
              htmlType="submit"
              className="w-full"
              loading={isSubmitting}
            />
            <p className="text-base text-zinc-600 mt-6 text-center">
              Slevové kódy lze uplatnit v platební bráně.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
