import React from "react";

type Props = {
  text: string;
  icon?: React.ReactNode;
};

export default function Tag({ text, icon }: Props) {
  return (
    <span className="text-xs px-3 py-1 bg-secondary text-white rounded-md font-semibold inline-flex items-center gap-1.5">
      {icon}
      {text}
    </span>
  );
}
