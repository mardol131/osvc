import React from "react";

type Props = {
  heading: string;
  subheading: string;
  text: string;
  mb?: number;
};

export default function HeadingCenter({
  heading,
  subheading,
  text,
  mb,
}: Props) {
  return (
    <div
      className={`flex flex-col items-center mb-${
        mb ? mb : 10
      } gap-3 max-w-200 justify-center text-center`}
    >
      <p className="font-semibold uppercase text-secondary">{subheading}</p>
      <h2 className="">{heading}</h2>
      <p className="text-xl text-textP">{text}</p>
    </div>
  );
}
