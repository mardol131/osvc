import { scrollToElement } from "@/app/_functions/scrollToElement";
import Image from "next/image";
//import Link from "next/link";
import logo from "@/public/logo-osvc.png";
import Link from "next/link";
import Button from "../../atoms/Button";
import { useState, useRef, useCallback } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useClickOutside } from "@/app/_hooks/useClickOutside";
import { calculators } from "@/app/_data/calculators";
import { useAuth } from "@/app/_context/auth-context";

export default function DesktopHeader() {
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const auth = useAuth();

  useClickOutside(dropdownRef, () => setToolsOpen(false));
  return (
    <header className="hidden lg:block backdrop-blur-xl  sticky top-0  w-full z-50 border-white shadow-sm">
      <div className="w-full px-10 flex bg-white/80  justify-center">
        <div className="max-w-wrapper w-full flex justify-between items-center items-center p-2">
          <Link href="/" className="group">
            <Image
              src={logo}
              width={100}
              height={100}
              alt="logo"
              className="h-15 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <ul className="text-primary font-semibold text-base flex items-center gap-8 justify-self-center">
            <li>
              <button
                onClick={() => {
                  scrollToElement("benefitsSection");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                Co získáte
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToElement("price");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                Cena
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToElement("faq");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                Otázky
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToElement("contact");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                Kontakt
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToElement("about");
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                O nás
              </button>
            </li>
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                }}
                className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
              >
                Nástroje
                <IoChevronDown
                  className={`text-base transition-transform duration-300 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col p-5 gap-4">
                    {calculators.map((calculator) => (
                      <Link
                        key={calculator.title}
                        href={calculator.href}
                        className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {calculator.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <Button
              variant="gold"
              size="sm"
              text="Koupit předplatné"
              href={"/koupit-predplatne"}
            />
            <Button
              variant="plain"
              size="sm"
              text="Správa předplatného"
              href={"/administrace/sprava-predplatneho"}
            />
          </ul>
        </div>
      </div>
      {auth.user && (
        <div className="w-full px-10 border-t border-zinc-100 bg-zinc-50/80 flex justify-center">
          <div className="max-w-wrapper w-full flex justify-between gap-5 items-center p-2">
            <div>
              <p>Uživatel: {auth.user.email}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="plain"
                size="xs"
                text="Správa předplatného"
                href={"/administrace/sprava-predplatneho"}
              />
              <Button
                variant="plain"
                size="xs"
                text="Odhlásit se"
                htmlType="button"
                onClick={() => auth.logout()}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
