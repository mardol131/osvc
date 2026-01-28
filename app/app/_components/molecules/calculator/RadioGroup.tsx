import React from "react";

export type RadioOption = {
  value: string | number | boolean;
  label: string;
  description?: string;
};

type Props = {
  label: string;
  options: RadioOption[];
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  name: string;
  description?: string;
};

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  name,
  description,
}: Props) {
  return (
    <div className="flex flex-col justify-between">
      <label className="block text-lg font-semibold text-primary mb-4">
        {label}
      </label>
      {description && (
        <p className="text-base text-textP mb-4">{description}</p>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={String(option.value)}
            className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 border-zinc-200 hover:border-secondary hover:bg-secondary/5 transition-all"
          >
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <div>
              <p className="font-semibold text-primary">{option.label}</p>
              {option.description && (
                <p className="text-sm text-textP">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
