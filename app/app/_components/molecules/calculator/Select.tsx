"use client";

import React from "react";
import { User } from "lucide-react";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  icon?: React.ReactNode;
  helperText?: string;
};

export default function Select({
  label,
  options,
  value,
  onChange,
  icon,
  helperText,
}: SelectProps) {
  return (
    <div className="flex items-center justify-between p-2 border rounded-lg bg-white">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <div className="font-medium text-sm text-primary">{label}</div>
          {helperText && <div className="text-xs text-textP">{helperText}</div>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 border rounded"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
