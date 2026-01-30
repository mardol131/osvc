"use client";

import { scrollToElement } from "@/app/_functions/scrollToElement";
import React, { useRef, useState } from "react";
import { IoMenu, IoChevronDown } from "react-icons/io5";
import logo from "@/public/logo-osvc.png";
import Image from "next/image";
import Link from "next/link";
import { useClickOutside } from "@/app/_hooks/useClickOutside";
import { calculators } from "@/app/_data/calculators";

export default function MobileHeader() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useClickOutside(menuRef, () => setToggle(false));

  return (
    <header className="lg:hidden bg-white/80 backdrop-blur-xl flex items-center justify-center md:px-10 px-4 py-4 sticky top-0 w-full z-50 border-b border-zinc-200 shadow-sm">
      <div className="max-w-wrapper w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={logo}
              width={100}
              height={100}
              alt="logo"
              className="h-12 w-auto"
            />
          </Link>
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
            <li className="relative">
              <button
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer text-left flex items-center gap-1"
              >
                Nástroje
                <IoChevronDown
                  className={`text-base transition-transform duration-300 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {toolsOpen && (
                <div className="mt-3 ml-0 space-y-2 py-2 bg-zinc-50 rounded-lg border border-zinc-100">
                  {calculators.map((calculator) => (
                    <Link
                      key={calculator.title}
                      href={calculator.href}
                      onClick={() => {
                        setToggle(false);
                        setToolsOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-secondary/10 transition-colors duration-200 text-primary font-oswald text-left"
                    >
                      {calculator.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="mt-4">
              <a
                href="/koupit-predplatne"
                className="block text-center shadow-lg text-base font-semibold py-3 px-6 bg-linear-to-r from-secondary to-tertiary text-white rounded-xl font-oswald hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
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
