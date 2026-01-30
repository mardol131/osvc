import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function InfoCard({ icon, title, description }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg text-secondary">
          {icon}
        </div>
        <h4 className="text-xl font-bebas">{title}</h4>
      </div>
      <p className="text-textP text-lg leading-relaxed">{description}</p>
    </div>
  );
}
