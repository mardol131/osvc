import React, { ReactNode } from "react";

type Props = {
  heading: ReactNode;
  headingTwo?: string;
  subheading: string;
  text: string;
  mb?: number;
};

export default function HeadingLeft({
  heading,
  headingTwo,
  subheading,
  text,
  mb,
}: Props) {
  return (
    <div
      className={`flex flex-col items-start mb-${
        mb ? mb : 10
      } gap-3 max-w-200 justify-start text-start`}
    >
      <p className="font-semibold uppercase text-secondary">{subheading}</p>
      <h2 className="">
        {heading}
        <br />
        {headingTwo}
      </h2>
      <p className="text-xl text-textP">{text}</p>
    </div>
  );
}
