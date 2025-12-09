"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  onFilterChange?: (filter: string | null) => void;
  itemCounts?: Record<string, number>;
};

export const hubDataList: hubDataType = [
  {
    slug: "nastroje",
    name: "Nástroje",
    data: [
      { slug: "umela-inteligence", name: "Umělá inteligence" },
      { slug: "automatizace", name: "Automatizace" },
      { slug: "fakturace", name: "Fakturace" },
      { slug: "ucetnictvi", name: "Účetnictví" },
    ],
  },
  {
    slug: "rady-clanky",
    name: "Rady a články",
    data: [
      { slug: "dane", name: "Daně" },
      { slug: "socialni-pojisteni", name: "Sociální pojištění" },
      { slug: "zdravotni-pojisteni", name: "Zdravotní pojištění" },
      { slug: "dph", name: "DPH" },
      { slug: "finance", name: "Finance" },
      { slug: "podcasty", name: "Podcasty" },
    ],
  },
  {
    slug: "komunita",
    name: "Komunity",
    data: [
      { slug: "fb-skupiny", name: "FB Skupiny" },
      { slug: "meetup", name: "Meetupy" },
      { slug: "podcasty-komunita", name: "Podcasty" },
    ],
  },
];

export type hubDataType = {
  slug: string;
  name: string;
  data: { slug: string; name: string }[];
}[];

export default function Categories({ onFilterChange, itemCounts = {} }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (slug: string) => {
    const newFilter = selectedFilter === slug ? null : slug;
    setSelectedFilter(newFilter);
    onFilterChange?.(newFilter);
  };

  const handleClearFilters = () => {
    setSelectedFilter(null);
    onFilterChange?.(null);
  };

  const getTotalItems = () => {
    return Object.values(itemCounts).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="sticky top-24 flex flex-col gap-6">
      {/* Header s tlačítkem pro vyčištění */}
      <div className="flex items-center justify-between">
        <h3 className="text-primary font-bold">Filtry</h3>
        {selectedFilter && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 text-sm text-secondary hover:text-tertiary transition-colors duration-200 font-semibold"
          >
            <IoClose className="text-lg" />
            Vyčistit
          </button>
        )}
      </div>

      {/* Celkový počet položek */}
      <div className="bg-linear-to-r from-secondary/10 to-tertiary/10 border border-secondary/30 rounded-xl p-4">
        <p className="text-sm text-textP">Celkem položek</p>
        <p className="text-3xl font-bold text-primary">{getTotalItems()}</p>
      </div>

      {/* Kategorie filtrů */}
      {hubDataList.map((group) => {
        return (
          <div key={group.slug} className="flex flex-col gap-3">
            <h5 className="text-primary tracking-wider font-bold uppercase text-sm tracking-wide">
              {group.name}
            </h5>
            <div className="flex flex-col gap-2">
              {group.data.map((item) => {
                const isSelected = selectedFilter === item.slug;
                const count = itemCounts[item.slug] || 0;

                return (
                  <button
                    key={item.slug}
                    onClick={() => handleFilterClick(item.slug)}
                    className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isSelected
                        ? "bg-linear-to-r from-secondary to-tertiary text-white shadow-lg scale-105"
                        : "bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-secondary/30 text-primary"
                    }`}
                  >
                    <span
                      className={`font-semibold text-sm ${
                        isSelected
                          ? "text-white"
                          : "text-primary group-hover:text-secondary"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
