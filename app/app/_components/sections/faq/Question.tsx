import React from "react";

type Props = { heading: string; text: string };

export default function Question({ heading, text }: Props) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 hover:border-secondary/30">
      <div className="px-6 py-4 bg-gradient-to-r from-primary to-zinc-800 text-textLight flex items-center gap-3">
        <div className="w-8 h-8 flex-shrink-0 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
          <span className="text-secondary text-xl font-semibold">Q</span>
        </div>
        <h5 className="text-left">{heading}</h5>
      </div>
      <div className="px-6 py-5 bg-white">
        <p className="text-textP text-base leading-relaxed text-left">{text}</p>
      </div>
    </div>
  );
}
