import React from "react";

type Props = { heading: string; text: string };

export default function Question({ heading, text }: Props) {
  return (
    <>
      <div className="border-3 border-primary rounded-lg">
        <div className="py-3  bg-primary text-textLight cursor-pointer">
          <p className=" text-xl">{heading}</p>
        </div>
        <div className="p-5">
          <p className="text-textP text-lg">{text}</p>
        </div>
      </div>
    </>
  );
}
