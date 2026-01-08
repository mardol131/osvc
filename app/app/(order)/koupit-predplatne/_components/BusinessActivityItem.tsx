"use client";

import { ActivityGroup } from "@/app/_data/businessActivities";
import React from "react";
import { FaPlus, FaCheck, FaCheckCircle } from "react-icons/fa";

type Props = {
  isSelected: boolean;
  onToggle: () => void;
} & ActivityGroup;

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
        relative p-4 md:p-5 rounded-lg border-l-4 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-secondary bg-secondary/5 shadow-md"
            : "border-zinc-300 bg-zinc-50 hover:border-secondary/50 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex max-lg:flex-col-reverse items-center max-lg:items-start justify-between gap-3 mb-2">
            <h5 className="text-zinc-800">{name}</h5>
            <span className="shrink-0 px-2 py-1 bg-secondary/10 text-secondary rounded text-base md:text-base">
              +{price} Kč/rok
            </span>
          </div>
          <p className="text-secondary text-sm md:text-base leading-relaxed mb-3">
            {description}
          </p>

          {/* Bodový seznam */}
          <div className="space-y-1.5">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 text-base mt-1 shrink-0" />
                <p className="text-zinc-700 text-base md:text-base">
                  {item.item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`
            shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all duration-200
            ${
              isSelected
                ? "bg-secondary text-white"
                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
            }
          `}
        >
          {isSelected ? (
            <FaCheck className="text-lg md:text-xl" />
          ) : (
            <FaPlus className="text-lg md:text-xl" />
          )}
        </button>
      </div>
    </div>
  );
}
