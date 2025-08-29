"use client";

import { scrollToElement } from "@/app/_functions/scrollToElement";
import React from "react";

type Props = {
  text: string;
  id: string;
  classes: string;
};

export default function BlackButton({ text, id, classes }: Props) {
  return (
    <button
      onClick={() => {
        scrollToElement(id);
      }}
      className={`${classes} shadow-lg md:text-2xl text-lg uppercase font-semibold py-3 md:px-6 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer`}
    >
      {text}
    </button>
  );
}
