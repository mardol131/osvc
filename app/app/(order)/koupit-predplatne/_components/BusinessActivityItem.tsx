"use client";

import React from "react";
import { FaPlus, FaCheck, FaCheckCircle } from "react-icons/fa";

type Props = {
  name: string;
  description: string;
  price: number;
  items: string[];
  isSelected: boolean;
  onToggle: () => void;
};

export default function BusinessActivityItem({
  name,
  description,
  price,
  items,
  isSelected,
  onToggle,
}: Props) {
  return (
    <div
      onClick={onToggle}
      className={`
        relative p-5 rounded-xl border cursor-pointer transition-all duration-300
        ${
          isSelected
            ? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
            : "border-zinc-200 bg-white hover:border-secondary/50 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h5 className="text-lg font-semibold text-zinc-800 mb-1">{name}</h5>
          <p className="text-zinc-600 text-sm leading-relaxed mb-3">
            {description}
          </p>

          {/* Bodový seznam konkrétních předmětů */}
          <div className="mb-3 space-y-1.5">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 text-xs mt-1 flex-shrink-0" />
                <span className="text-zinc-700 text-xs">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-secondary font-semibold text-base">
            +{price} Kč/rok
          </div>
        </div>

        <button
          className={`
            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
            ${
              isSelected
                ? "bg-secondary text-white"
                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
            }
          `}
        >
          {isSelected ? (
            <FaCheck className="text-xl" />
          ) : (
            <FaPlus className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
}
