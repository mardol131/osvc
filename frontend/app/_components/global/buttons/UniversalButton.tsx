"use client";

import React from "react";
import Link from "next/link";

export type ButtonType = {
  onClickFunction?: (params: any) => void;
  options: ButtonOptions;
};

export type ButtonOptions = {
  color: "orange" | "black" | "white";
  size: "large" | "middle" | "small";
  text: string;
  className?: string;
  href?: {
    href: string;
    target?: "_blank" | "_parent" | "_self";
  };
  textAlign?: "start" | "center" | "end";
};

const buttonColorTypes = {
  orange: "bg-linear-150 from-secondary to-colorTo text-textLight",
  black: "bg-primary text-textLight",
  white: "shadow-none text-secondary",
};

const buttonSizeTypes = {
  large: "py-3 md:px-6 px-3 md:text-2xl text-lg",
  middle: "py-2 md:px-4 px-2 md:text-xl text-lg",
  small: "py-2 md:px-2 px-2 md:text-lg text-md",
};

export default function UniversalButton({
  options,
  onClickFunction,
}: ButtonType) {
  if (options.href) {
    return (
      <Link
        href={options.href.href}
        target={options.href.target ? options.href.target : "_parent"}
        className={`${options.className} ${buttonColorTypes[options.color]} ${
          buttonSizeTypes[options.size]
        } shadow-lg cursor-pointer uppercase font-semibold hover:scale-105 transition-all ease-in-out  rounded-lg font-oswald ${
          options.textAlign ? "text-" + options.textAlign : "text-center"
        }
`}
      >
        {options.text}
      </Link>
    );
  }
  return (
    <button
      onClick={onClickFunction}
      className={`${options.className} ${buttonColorTypes[options.color]} ${
        buttonSizeTypes[options.size]
      } shadow-lg cursor-pointer uppercase font-semibold  hover:scale-105 transition-all ease-in-out  rounded-lg font-oswald ${
        options.textAlign ? "text-" + options.textAlign : "text-center"
      }
`}
    >
      {options.text}
    </button>
  );
}
