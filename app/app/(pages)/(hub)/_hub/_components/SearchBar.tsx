"use client";

import React, { useState, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

type Props = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

export default function SearchBar({
  onSearch,
  placeholder = "Hledat v katalogu...",
  debounceMs = 500,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs, onSearch]);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative w-full">
      {/* Ikona vyhledávání */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <IoSearch className="text-2xl text-zinc-400" />
      </div>

      {/* Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-14 pr-14 py-4 text-lg bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-200 placeholder:text-zinc-400 font-oswald"
      />

      {/* Tlačítko vymazat */}
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-100 rounded-lg transition-colors duration-200 group"
          aria-label="Vymazat hledání"
        >
          <IoClose className="text-2xl text-zinc-400 group-hover:text-secondary transition-colors" />
        </button>
      )}
    </div>
  );
}
