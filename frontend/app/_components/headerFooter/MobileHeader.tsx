"use client";

import { scrollToElement } from "@/app/_functions/scrollToElement";
import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import logo from "../../../public/logo-osvc.png";
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
    <header className="lg:hidden bg-white/50 backdrop-blur-md flex items-center justify-center md:px-10 px-4 py-4 fixed top-0 w-full z-50">
      <div className="max-w-wrapper w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="h-12 w-auto"
          />
          <IoMenu
            className="text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setToggle(!toggle);
            }}
          />
        </div>
        {toggle && (
          <ul
            ref={menuRef}
            className="text-primary font-semibold text-lg flex flex-col gap-10 justify-self-center mt-10 mb-10"
          >
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  scrollToElement("benefitsSection");
                }}
                className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
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
                className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
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
                className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
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
                className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
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
                className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
              >
                Kontakt
              </button>
            </li>
            <li>
              <a
                href={process.env.NEXT_PUBLIC_PAYMENT_LINK}
                className="shadow-lg text-lg font-semibold py-2 px-5 bg-primary text-textLight rounded-lg font-oswald hover:scale-105 transition-all ease-in-out justify-self-end"
              >
                Koupit roční členství
              </a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
