"use client";

import React from "react";
import { User } from "lucide-react";

type Props = {
  label: string;
  count: number;
  onChange: (n: number) => void;
  perChild: number;
};

export default function ChildSelector({
  label,
  count,
  onChange,
  perChild,
}: Props) {
  const formatCurrency = (v: number) =>
    v.toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });

  return (
    <div className="flex items-center justify-between p-2 border rounded-lg bg-white">
      <div className="flex items-center gap-3">
        <User className="w-6 h-6 text-secondary" />
        <div>
          <div className="font-medium text-sm text-primary">{label}</div>
          <div className="text-xs text-textP">Vyberte počet (0–10)</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={count}
          onChange={(e) => onChange(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <div className="text-right">
          <div className="text-xs text-textP">Celkem</div>
          <div className="font-bebas">{formatCurrency(count * perChild)}</div>
        </div>
      </div>
    </div>
  );
}
