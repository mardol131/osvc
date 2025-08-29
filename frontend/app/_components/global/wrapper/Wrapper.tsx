import React from "react";

type Props = {
  children: React.ReactNode;
  classNameOne?: string;
  classNameTwo?: string;
};

export default function Wrapper({
  children,
  classNameOne,
  classNameTwo,
}: Props) {
  return (
    <div
      className={`${classNameOne} w-full flex items-center justify-center gap-20 md:py-30 py-20 pt-30 md:pt-60`}
    >
      <div className={`${classNameTwo} max-w-wrapper md:mx-10 mx-4`}>
        {children}
      </div>
    </div>
  );
}
