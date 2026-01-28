"use client";

import React from "react";

export type BreakdownItem = {
  label: string;
  value: string;
  description?: string;
  type: "calculation";
};

type Props = {
  title: string;
  items: (
    | BreakdownItem
    | {
        type: "divider";
        label: string;
      }
  )[];
  result: BreakdownItem;
  className?: string;
};

export default function CalculationBreakdown({
  title,
  items,
  result,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <div>
        <h3 className="text-xl font-bebas mb-4 text-primary">{title}</h3>
        <div className="space-y-3">
          {items.map((it) => {
            if (it.type === "calculation") {
              return (
                <div key={it.label} className="">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="font-medium text-sm text-zinc-700">
                        {it.label}
                      </p>
                      {it.description && (
                        <p className="text-xs text-textP mt-1">
                          {it.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bebas text-lg">{it.value}</p>
                    </div>
                  </div>
                </div>
              );
            }
            if (it.type === "divider") {
              return (
                <div key={it.label} className="border-t border-zinc-200 my-2">
                  <p className="text-center text-xs text-zinc-500 italic mt-2">
                    {it.label}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="mt-4 p-4 rounded-lg bg-linear-to-br from-primary/5 to-secondary/5 border-2 border-zinc-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-primary">{result.label}</p>
            {result.description && (
              <p className="text-xs text-textP mt-1">{result.description}</p>
            )}
          </div>
          <div className="text-2xl font-bebas text-primary">{result.value}</div>
        </div>
      </div>
    </div>
  );
}
