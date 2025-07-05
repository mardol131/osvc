import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="min-h-20 bg-white flex items-center justify-center px-10">
      <div className="max-w-wrapper w-full flex justify-between items-center">
        <p className="font-extrabold text-2xl uppercase">Logo</p>
        <ul className="text-primary font-semibold text-lg flex gap-10">
          <li>
            <Link href="#about">Co získáte</Link>
          </li>
          <li>
            <Link href="#about">Cena</Link>
          </li>
          <li>
            <Link href="#about">Proč to děláme</Link>
          </li>
          <li>
            <Link href="#about">O nás</Link>
          </li>
          <li>
            <Link href="#about">Kontakt</Link>
          </li>
        </ul>
        <button className="text-lg font-semibold py-2 px-5 bg-primary text-textLight rounded-full font-oswald">
          Koupit
        </button>
      </div>
    </header>
  );
}
