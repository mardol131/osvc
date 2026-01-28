import React from "react";

type Props = {
  label: string;
  value: number;
  backgroundColor?: "secondary" | "primary";
  children?: React.ReactNode;
};

export default function CurrencyDisplay({
  label,
  value,
  backgroundColor = "primary",
  children,
}: Props) {
  const formatCurrency = (val: number) => {
    return val.toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });
  };

  const bgClass =
    backgroundColor === "secondary"
      ? "bg-linear-to-br from-secondary/10 to-tertiary/5 border-secondary/20"
      : "bg-linear-to-br from-primary/10 to-zinc-700/5 border-primary/20";

  const textColorClass =
    backgroundColor === "secondary" ? "text-secondary" : "text-primary";

  return (
    <div className={`${bgClass} rounded-xl p-8 border`}>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-sm font-semibold ${textColorClass} uppercase tracking-wider`}
        >
          {label}
        </span>
      </div>
      <div className="text-4xl md:text-5xl font-bebas text-primary">
        {formatCurrency(value)}
      </div>
      {children}
    </div>
  );
}
