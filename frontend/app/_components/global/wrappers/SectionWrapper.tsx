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
};

export default function SectionWrapper({
  levelOne,
  levelTwo,
  children,
}: Props) {
  return (
    <div
      className={`${levelOne?.className} w-full flex items-center justify-center gap-20 md:py-30 py-20 pt-30 md:pt-40`}
    >
      <div
        className={`${levelTwo?.className} ${
          levelTwo?.width ? levelTwo.width : "max-w-wrapper"
        } w-full md:mx-10 mx-4`}
      >
        {children}
      </div>
    </div>
  );
}
