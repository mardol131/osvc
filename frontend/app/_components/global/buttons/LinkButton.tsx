"use client";

import React from "react";
import UniversalButton, { ButtonOptions } from "./UniversalButton";

type Props = {
  options: ButtonOptions;
};

export default function LinkButton({ options }: Props) {
  return <UniversalButton options={options} />;
}
