"use client";

import { scrollToElement } from "@/app/_functions/scrollToElement";
import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import logo from "@/public/logo-osvc.png";
import Image from "next/image";

export default function MobileHeader() {
  const [toggle, setToggle] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggle(false);
      }
    }

    if (toggle) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggle]);

  return (
    <header className="lg:hidden bg-white/80 backdrop-blur-xl flex items-center justify-center md:px-10 px-4 py-4 sticky top-0 w-full z-50 border-b border-zinc-200 shadow-sm">
      <div className="max-w-wrapper w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="h-12 w-auto"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setToggle(!toggle);
            }}
            className="p-2 hover:bg-secondary/10 rounded-lg transition-colors duration-200"
          >
            <IoMenu className="text-3xl text-primary" />
          </button>
        </div>
        {toggle && (
          <ul
            ref={menuRef}
            className="text-primary font-semibold text-base flex flex-col gap-6 justify-self-center mt-6 mb-6 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  scrollToElement("benefitsSection");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer text-left"
              >
                Co získáte
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  scrollToElement("price");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer text-left"
              >
                Cena
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  scrollToElement("about");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer text-left"
              >
                Proč to děláme
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  scrollToElement("faq");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer text-left"
              >
                Otázky
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  scrollToElement("contact");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer text-left"
              >
                Kontakt
              </button>
            </li>
            <li className="mt-4">
              <a
                href="/koupit-predplatne"
                className="block text-center shadow-lg text-base font-semibold py-3 px-6 bg-gradient-to-r from-secondary to-tertiary text-white rounded-xl font-oswald hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Koupit roční předplatné
              </a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
