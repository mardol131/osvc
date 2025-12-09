import React from "react";
import SectionWrapper from "../blocks/SectionWrapper";

type Props = {
  options: {
    text: string;
  };
};

export default function TextDivider({ options }: Props) {
  return (
    <SectionWrapper>
      <div className="relative max-w-wrapper rounded-xl shadow-2xl flex flex-col items-center bg-gradient-to-r from-primary via-zinc-800 to-primary justify-center text-center md:px-10 px-6 py-12 text-textLight overflow-hidden border border-secondary/20">
        {/* Dekorativní gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <h3 className="relative z-10 text-2xl font-bebas uppercase tracking-wide">
          {options.text}
        </h3>
      </div>
    </SectionWrapper>
  );
}
