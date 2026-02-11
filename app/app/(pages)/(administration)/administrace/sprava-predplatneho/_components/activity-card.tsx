"use client";

import { useState } from "react";
import { ActivityGroup } from "@/app/_data/businessActivities";
import Button from "@/app/_components/atoms/Button";
import { ChevronDown } from "lucide-react";

interface ActivityCardProps {
  group: ActivityGroup;
  onClick?: (group: ActivityGroup) => void;
}

export default function ActivityCard({ group, onClick }: ActivityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="w-full bg-zinc-50 rounded-lg border border-zinc-200">
      <div className="flex max-md:flex-col items-center max-md:items-start justify-between gap-4 p-4">
        <div className="flex-1 flex items-center gap-4 min-w-0">
          <p className="text-base font-medium">{group.name}</p>{" "}
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-zinc-100 rounded transition-colors"
            aria-label={isExpanded ? "Sbalit" : "Rozbalit"}
          >
            <div className="bg-secondary/10 p-2 rounded-md text-secondary">
              <ChevronDown
                size={20}
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>
          </button>
        </div>
        {isExpanded && (
          <div className="md:hidden px-4 pb-4 pt-2 border-t border-zinc-100 space-y-3">
            <p className="text-base text-zinc-600">{group.description}</p>
            {group.items.length > 0 && (
              <div className="space-y-2">
                <h6 className="text-base font-semibold text-zinc-700 uppercase tracking-wide">
                  Položky:
                </h6>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="text-base text-zinc-600 flex items-start gap-2"
                    >
                      <span className="text-secondary mt-1">•</span>
                      <span>{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 shrink-0">
          {onClick && (
            <div className="text-right">
              <p className="text-bse font-semibold text-secondary">
                {group.price} Kč
              </p>
            </div>
          )}

          {onClick && (
            <Button text="Dokoupit" onClick={() => onClick(group)} size="sm" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="md:block hidden px-4 pb-4 pt-2 border-t border-zinc-100 space-y-3">
          <p className="text-base text-zinc-600">{group.description}</p>
          {group.items.length > 0 && (
            <div className="space-y-2">
              <h6 className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Položky:
              </h6>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="text-base text-zinc-600 flex items-start gap-2"
                  >
                    <span className="text-secondary mt-1">•</span>
                    <span>{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
