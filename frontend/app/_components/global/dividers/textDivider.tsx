import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";

type Props = {
  options: {
    text: string;
  };
};

export default function TextDivider({ options }: Props) {
  return (
    <>
      <div className=" flex items-center justify-center md:px-10 px-4 py-10 bg-primary text-textLight">
        <div className="max-w-wrapper flex flex-col gap-10 items-center justify-center text-center mb-[-4px]">
          <p className="text-xl font-bebas uppercase">{options.text}</p>
        </div>
      </div>
    </>
  );
}
