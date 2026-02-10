"use client";

import { scrollToElement } from "@/app/_functions/scrollToElement";
import React, { useRef, useState } from "react";
import { IoMenu, IoChevronDown } from "react-icons/io5";
import logo from "@/public/logo-osvc.png";
import Image from "next/image";
import Link from "next/link";
import { useClickOutside } from "@/app/_hooks/useClickOutside";
import { calculators } from "@/app/_data/calculators";
import { useAuth } from "@/app/_context/auth-context";
import Button from "../../atoms/Button";
import { Settings, LogOut, ChevronDown } from "lucide-react";

export default function MobileHeader() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setToggle(false));
  useClickOutside(userMenuRef, () => setUserMenuOpen(false));

  const auth = useAuth();

  return (
    <header className="lg:hidden bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center fixed top-0 w-full z-50 border-b border-zinc-200 shadow-sm">
      <div className="w-full px-4 py-4">
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

              <li className="mt-4 flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setToggle(false);
                  }}
                  text="Koupit roční předplatné"
                  href="/koupit-predplatne"
                />

                <Button
                  onClick={() => {
                    setToggle(false);
                  }}
                  text="Správa předplatného"
                  href="/administrace/sprava-predplatneho"
                  variant="plain"
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      {auth.user && (
        <div
          ref={userMenuRef}
          className="w-full px-4 border-t-2 border-zinc-200 bg-zinc-50/85 flex justify-center"
        >
          <div className="max-w-wrapper w-full flex justify-between gap-5 items-center p-2">
            <div>
              <p className="text-sm">{auth.user.email}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-200/50 rounded-lg transition-colors duration-200"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-zinc-200 shadow-lg overflow-hidden z-10">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      auth.logout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors duration-200 text-left text-primary border-t border-zinc-100"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Odhlásit se</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
