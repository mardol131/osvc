import React from "react";

type Props = {
  onClick: () => void;
  text: string;
};

export default function LoginModalFooterButton({ onClick, text }: Props) {
  return (
    <button
      type="button"
      className="text-sm text-secondary hover:scale-105 transition-all ease-in-out cursor-pointer underline"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
