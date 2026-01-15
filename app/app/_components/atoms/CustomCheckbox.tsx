"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  value?: string;
  required?: boolean;
  label: React.ReactNode;
  className?: string;
};

export default function CustomCheckbox({
  checked,
  onChange,
  name,
  value = "true",
  required = false,
  label,
  className = "",
}: Props) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-start gap-3 cursor-pointer group ${className}`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        required={required}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className="shrink-0 text-xl mt-1">
        {checked ? (
          <MdCheckBox className="text-secondary/80" />
        ) : (
          <MdCheckBoxOutlineBlank className="text-primary/40" />
        )}
      </div>
      <span className="text-base text-zinc-600 leading-relaxed">{label}</span>
    </div>
  );
}
