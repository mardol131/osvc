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
      <Icon className="text-secondary text-2xl flex-shrink-0" />
      <div>
        <p className="text-primary font-semibold text-sm mb-1">{heading}</p>
        <p className="text-textP text-sm">{text}</p>
      </div>
    </div>
  );
}
