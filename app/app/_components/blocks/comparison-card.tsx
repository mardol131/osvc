import React from "react";

interface ComparisonCardProps {
  title: string;
  children: React.ReactNode;
  gradient?: boolean;
}

export default function ComparisonCard({
  title,
  children,
  gradient = false,
}: ComparisonCardProps) {
  return (
    <div
      className={`group relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
        gradient
          ? "bg-gradient-to-br from-secondary/5 via-white to-tertiary/5 border border-secondary/30 shadow-lg hover:shadow-2xl"
          : "bg-white border border-zinc-200"
      }`}
    >
      {/* Dekorativní gradient při hover */}
      {!gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}

      {/* Gradient dekorativní prvek pro zvýrazněnou kartu */}
      {gradient && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-secondary/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      )}

      <div className="relative z-10 p-8">
        <div className="mb-6">
          <h4 className="text-primary text-center">{title}</h4>
        </div>
        {children}
      </div>
    </div>
  );
}
