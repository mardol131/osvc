"use client";

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export type SortOption = "price-asc" | "price-desc";

type Props = {
  onSortChange?: (sortOption: SortOption) => void;
};

const sortOptions = [
  { value: "price-asc" as SortOption, label: "Cena: Od nejnižší" },
  { value: "price-desc" as SortOption, label: "Cena: Od nejvyšší" },
];

export default function Sort({ onSortChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>("price-asc");

  const handleSelect = (option: SortOption) => {
    setSelectedSort(option);
    onSortChange?.(option);
    setIsOpen(false);
  };

  const selectedLabel =
    sortOptions.find((opt) => opt.value === selectedSort)?.label ||
    "Řadit podle";

  return (
    <div className="relative w-full max-w-80">
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-lg bg-white border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-200 font-oswald text-left flex items-center justify-between hover:border-zinc-300"
      >
        <span className="text-zinc-700">{selectedLabel}</span>
        <IoChevronDown
          className={`text-2xl text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-zinc-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-6 py-3 text-left text-base font-oswald transition-colors ${
                selectedSort === option.value
                  ? "bg-secondary text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Overlay pro zavření dropdownu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
