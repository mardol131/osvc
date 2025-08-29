import React from "react";
import BlackButton from "./BlackButton";
import GoldButton from "./GoldButton";
export type ButtonType = {
  type: "orange" | "black" | "white";
  text: string;
  onClick?: () => void;
  className?: string;
  href?: string;
  id?: string;
};

export default function UniversalButton({
  type,
  text,
  onClick,
  className,
}: ButtonType) {
  switch (type) {
    case "black":
      return <BlackButton text={text} />;
    case "orange":
      return <GoldButton text={text} />;
  }
}
