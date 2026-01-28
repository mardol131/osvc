"use client";

import React from "react";
import { CheckSquare, Square } from "lucide-react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  amount?: number;
  description?: string;
};

export default function CheckboxToggle({
  label,
  checked,
  onChange,
  amount,
  description,
}: Props) {
  const formatCurrency = (v: number) =>
    v.toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });

  return (
    <div className="flex items-center justify-between p-2 border rounded-lg bg-white">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-center gap-3 text-left w-full"
      >
        <div className="shrink-0">
          {checked ? (
            <CheckSquare className="w-6 h-6 text-secondary" />
          ) : (
            <Square className="w-6 h-6 text-zinc-400" />
          )}
        </div>
        <div className="grow">
          <div className="font-medium text-sm text-primary">{label}</div>
          {description && (
            <div className="text-xs text-textP">{description}</div>
          )}
        </div>
      </button>

      {typeof amount === "number" && (
        <div className="ml-4 text-right">
          <div className="font-bebas text-base">{formatCurrency(amount)}</div>
        </div>
      )}
    </div>
  );
}
