import { scrollToElement } from "@/app/_functions/scrollToElement";
import Image from "next/image";
//import Link from "next/link";
import logo from "@/public/logo-osvc.png";
import Link from "next/link";
import Button from "../../atoms/Button";

export default function DesktopHeader() {
  return (
    <header className="hidden min-h-20 bg-white/80 backdrop-blur-xl lg:flex items-center justify-center px-10 sticky top-0 w-full z-50 border-b border-zinc-200 shadow-sm">
      <div className="max-w-wrapper w-full grid grid-cols-[1fr_3fr_1fr] items-center p-2">
        <Link href="/" className="group">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="h-15 w-auto group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <ul className="text-primary font-semibold text-base flex gap-8 justify-self-center">
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
                scrollToElement("about");
              }}
              className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
            >
              Proč to děláme
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
          {/* <li>
            <Link
              href={"/hub"}
              className="hover:text-secondary transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
            >
              Hub
            </Link>
          </li> */}
        </ul>

        <Button
          variant="black"
          size="sm"
          text="Koupit předplatné"
          href={"/koupit-predplatne"}
        />
      </div>
    </header>
  );
}
