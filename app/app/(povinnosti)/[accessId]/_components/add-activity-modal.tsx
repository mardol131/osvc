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

  if (!group) return null;

  const handleClose = () => {
    setTermsChecked(false);
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={handleClose}
      title="Dokoupit předmět podnikání"
    >
      <form onSubmit={onSubmit}>
        {/* Box s informacemi o skupině - podobný BusinessActivityItem */}
        <div className="bg-secondary/5 rounded-xl p-5 md:p-6 border-l-4 mb-3 border-secondary">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h5 className="text-zinc-800">{group.name}</h5>
            <span className="shrink-0 px-3 py-1.5 bg-secondary text-white rounded-lg text-sm md:text-base">
              {group.price} Kč/rok
            </span>
          </div>

          {/* Seznam předmětů podnikání - stejný styl jako BusinessActivityItem */}
          {group.items && group.items.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-zinc-300">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 text-base mt-1 shrink-0" />
                  <p className="text-zinc-700 text-sm md:text-base">
                    {item.item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informační box o ceně */}
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm text-zinc-700">
              <strong>K úhradě nyní:</strong>
            </p>
            <p className="text-2xl font-bold text-emerald-700">
              {finalPriceThatWillBePaid !== null
                ? `${finalPriceThatWillBePaid} Kč`
                : "Počítám..."}
            </p>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Cena je dopočítána podle zbývajícího období vašeho předplatného. Po
            jeho vypršení bude tento předmět podnikání účtován za{" "}
            <span className="font-semibold">{group.price} Kč/rok</span>. Skupina
            předmětů podnikání bude ihned dostupná pro další měsíc.
          </p>
        </div>

        {/* Checkbox pro obchodní podmínky - stejný jako v OrderSummary */}
        <div className="pt-2">
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
              </>
            }
          />
        </div>

        {/* Footer tlačítka */}
        <div className="bg-white w-full pt-4 rounded-b-2xl border-t pb-5 border-zinc-100">
          <Button
            text={isSubmitting ? "Zpracovávám..." : "Dokoupit"}
            variant="gold"
            size="md"
            disabled={!termsChecked || isSubmitting}
            className="w-full sm:w-auto"
            loading={isSubmitting}
            htmlType="submit"
          />
        </div>
      </form>
    </ModalLayout>
  );
}
