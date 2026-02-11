import React from "react";

type Props = {
  children: React.ReactNode;
  levelOne?: {
    className?: string;
    height?: {
      mobile?: number;
      desktop?: number;
    };
  };
  levelTwo?: { className?: string; width?: string };
  id?: string;
};

export default function SectionWrapper({
  levelOne,
  levelTwo,
  children,
  id,
}: Props) {
  return (
    <div
      id={id}
      className={`${levelOne?.className} w-full flex items-center justify-center gap-20 px-2 pb-20`}
    >
      <div
        className={`${levelTwo?.className} ${
          levelTwo?.width ? levelTwo.width : "max-w-wrapper"
        } w-full md:mx-10 mx-4 flex flex-col gap-5`}
      >
        {children}
      </div>
    </div>
  );
}
