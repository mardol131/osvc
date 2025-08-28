import React from "react";

type Props = { text: string; href: string | undefined };

export default function GoldButton({ text, href }: Props) {
  return (
    <a
      href={href}
      className="shadow-lg cursor-pointer md:text-2xl text-lg uppercase font-semibold py-3 md:px-6 px-3 bg-linear-150 from-tertiary to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald flex items-center justify-center"
    >
      {text}
    </a>
  );
}
