"use client";

import React from "react";
import UniversalButton, { ButtonOptions } from "./UniversalButton";
import { scrollToElement } from "@/app/_functions/scrollToElement";

type Props = {
  id: string;
  options: ButtonOptions;
};

export default function ScrollButton({ id, options }: Props) {
  return (
    <UniversalButton
      options={options}
      onClickFunction={() => {
        scrollToElement(id);
      }}
    />
  );
}
