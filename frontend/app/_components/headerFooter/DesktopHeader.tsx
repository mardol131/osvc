import { paymentUrl } from "@/app/_data/pricing";
import { scrollToElement } from "@/app/_functions/scrollToElement";
import React from "react";

export default function DesktopHeader() {
  return (
    <header className="hidden min-h-20 bg-white/50 backdrop-blur-md lg:flex items-center justify-center px-10 fixed top-0 w-full z-50">
      <div className="max-w-wrapper w-full grid grid-cols-[1fr_4fr_1fr] items-center">
        <p className="font-extrabold text-2xl uppercase justify-self-start">
          Logo
        </p>
        <ul className="text-primary font-semibold text-lg flex gap-10 justify-self-center">
          <li>
            <button
              onClick={() => {
                scrollToElement("benefits");
              }}
              className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
            >
              Co získáte
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToElement("price");
              }}
              className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
            >
              Cena
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToElement("about");
              }}
              className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
            >
              Proč to děláme
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToElement("faq");
              }}
              className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
            >
              Otázky
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToElement("contact");
              }}
              className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
            >
              Kontakt
            </button>
          </li>
        </ul>
        <a
          href={paymentUrl}
          className="shadow-lg uppercase text-lg font-semibold py-2 px-5 bg-primary text-textLight rounded-lg font-oswald hover:scale-105 transition-all ease-in-out justify-self-end"
        >
          Koupit
        </a>
      </div>
    </header>
  );
}
