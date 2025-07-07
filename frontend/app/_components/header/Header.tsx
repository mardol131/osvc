import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="min-h-20 bg-white/50 backdrop-blur-md flex items-center justify-center px-10 fixed top-0 w-full z-50">
      <div className="max-w-wrapper w-full grid grid-cols-[1fr_4fr_1fr] items-center">
        <p className="font-extrabold text-2xl uppercase justify-self-start">
          Logo
        </p>
        <ul className="text-primary font-semibold text-lg flex gap-10 justify-self-center">
          <li>
            <Link
              href="#about"
              className="hover:text-tertiary transition-all ease-in-out"
            >
              Co získáte
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-tertiary transition-all ease-in-out"
            >
              Cena
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-tertiary transition-all ease-in-out"
            >
              Proč to děláme
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-tertiary transition-all ease-in-out"
            >
              O nás
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-tertiary transition-all ease-in-out"
            >
              Kontakt
            </Link>
          </li>
        </ul>
        <a
          href="/"
          className="shadow-lg text-lg font-semibold py-2 px-5 bg-primary text-textLight rounded-lg font-oswald hover:scale-105 transition-all ease-in-out justify-self-end"
        >
          Chci to koupit
        </a>
      </div>
    </header>
  );
}
