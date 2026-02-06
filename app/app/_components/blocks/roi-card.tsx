import React from "react";

interface RoiCardProps {
  icon: React.ReactNode;
  header: string;
  text: string;
  value: string;
  valueLabel: string;
}

export default function RoiCard({
  icon,
  header,
  text,
  value,
  valueLabel,
}: RoiCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border border-zinc-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Dekorativní gradient při hover */}

      <div className="relative flex justify-between h-full flex-col z-10 p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="flex-1">
            <h5 className="text-primary break-words">{header}</h5>
          </div>
        </div>
        <p className="text-textP leading-relaxed mb-4">{text}</p>
        <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/10">
          <p className="text-2xl font-bebas text-secondary">{value}</p>
          <p className="text-base text-textP mt-1">{valueLabel}</p>
        </div>
      </div>
    </div>
  );
}
