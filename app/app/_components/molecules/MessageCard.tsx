import React from "react";
import { IconType } from "react-icons";

interface MessageCardProps {
  icon: IconType;
  heading: string;
  text: string;
}

export default function MessageCard({
  icon: Icon,
  heading,
  text,
}: MessageCardProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
      <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-secondary text-2xl flex-shrink-0" />
      </div>
      <div>
        <p className="text-primary font-semibold text-sm mb-1">{heading}</p>
        <p className="text-textP text-sm">{text}</p>
      </div>
    </div>
  );
}
