"use client";

import React, { useState } from "react";
import { ActivityGroup } from "@/app/_data/businessActivities";
import Button from "@/app/_components/atoms/Button";
import CustomCheckbox from "@/app/_components/atoms/CustomCheckbox";
import ModalLayout from "@/app/_components/molecules/modal-layout";
import { FaCheckCircle } from "react-icons/fa";

interface AddActivityModalProps {
  group: ActivityGroup | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  finalPriceThatWillBePaid: number | null;
}

export default function AddActivityModal({
  group,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  finalPriceThatWillBePaid,
}: AddActivityModalProps) {
  const [termsChecked, setTermsChecked] = useState(false);
  const [paymentConsent, setPaymentConsent] = useState(false);

  if (!group) return null;

  const handleClose = () => {
    setTermsChecked(false);
    setPaymentConsent(false);
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={handleClose}
      title="Dokoupit předmět podnikání"
      maxWidth="lg"
    >
      <form onSubmit={onSubmit} className="flex flex-col">
        {/* Informace o skupině */}
        <div className="bg-secondary/5 rounded-xl p-5 border-l-4 border-secondary mb-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h5 className="text-zinc-800">{group.name}</h5>
            <span className="shrink-0 px-3 py-1.5 bg-secondary text-white rounded-lg text-sm font-semibold">
              {group.price} Kč/rok
            </span>
          </div>

          {group.items && group.items.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-zinc-300">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 text-base mt-1 shrink-0" />
                  <p className="text-zinc-700 text-sm">{item.item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent my-6"></div>

        {/* Cenová informace */}
        <div className="flex justify-between items-end mb-6">
          <span className="text-sm text-zinc-700">K úhradě nyní</span>
          <span className="text-3xl font-bold text-secondary">
            {finalPriceThatWillBePaid !== null
              ? `${finalPriceThatWillBePaid} Kč`
              : "Počítám..."}
          </span>
        </div>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 mb-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Cena je dopočítána podle zbývajícího období vašeho předplatného. Po
            jeho vypršení bude tento předmět podnikání účtován za{" "}
            <span className="font-semibold">{group.price} Kč/rok</span>. Skupina
            předmětů podnikání bude ihned dostupná pro další měsíc.
          </p>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent my-6"></div>

        {/* Checkboxy */}
        <div className="mb-6 flex flex-col gap-3">
          <CustomCheckbox
            name="paymentConsent"
            checked={paymentConsent}
            onChange={setPaymentConsent}
            required
            label={
              <span className="text-sm text-zinc-600 leading-relaxed">
                Souhlasím s okamžitým stržením částky z platební karty nastavené
                pro předplatné
              </span>
            }
          />

          <CustomCheckbox
            name="terms"
            checked={termsChecked}
            onChange={setTermsChecked}
            required
            label={
              <span className="text-sm text-zinc-600 leading-relaxed">
                Souhlasím s{" "}
                <a
                  href="/obchodni-podminky.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline font-medium"
                >
                  obchodními podmínkami
                </a>{" "}
                a{" "}
                <a
                  href="/gdpr.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline font-medium"
                >
                  zpracováním osobních údajů
                </a>
                .
              </span>
            }
          />
        </div>

        {/* Footer tlačítka */}
        <div className="border-t border-zinc-100 pt-4 -mx-6 px-6 -mb-6 pb-6">
          <Button
            text={
              isSubmitting ? "Zpracovávám..." : "Dokoupit předmět podnikání"
            }
            variant="gold"
            size="md"
            disabled={!termsChecked || !paymentConsent || isSubmitting}
            className="w-full"
            loading={isSubmitting}
            htmlType="submit"
          />
        </div>
      </form>
    </ModalLayout>
  );
}
