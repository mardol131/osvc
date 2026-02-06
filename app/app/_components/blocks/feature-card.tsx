import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

export default function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="shrink-0 mb-5 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bebas mb-3 text-primary">{title}</h3>
      <p className="text-textP">{text}</p>
    </div>
  );
}
