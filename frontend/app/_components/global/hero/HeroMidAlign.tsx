import React from "react";

type Props = {
  options: {
    heading: string;
    secondHeading?: string;
    text: string;
    socialProof?: React.ReactNode;
    buttons?: React.ReactNode;
  };
};

export default function HeroMidAlign({ options }: Props) {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="">
          {options.heading} <br />
          {options.secondHeading}
        </h1>
      </div>
      <p className="md:text-2xl text-lg text-textP">{options.text}</p>
      <div className="grid grid-cols-2 gap-4 mt-10">{options.buttons}</div>
      {options.socialProof}
    </>
  );
}
