import { scrollToElement } from "@/app/_functions/scrollToElement";
import Image from "next/image";
//import Link from "next/link";
import React from "react";
import logo from "../../../../public/logo-osvc.png";
import { stripePayment } from "@/app/_data/links";
import LinkButton from "../buttons/LinkButton";
import Link from "next/link";

export default function DesktopHeader() {
  return (
    <header className="hidden min-h-20 bg-white/50 backdrop-blur-md lg:flex items-center justify-center px-10 fixed top-0 w-full z-50">
      <div className="max-w-wrapper w-full grid grid-cols-[1fr_3fr_1fr] items-center">
        <Link href="/">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="h-15 w-auto"
          />
        </Link>
        <ul className="text-primary font-semibold text-lg flex gap-10 justify-self-center">
          <li>
            <button
              onClick={() => {
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
          {/* <li>
            <Link
              href={"/hub"}
              className="hover:text-tertiary transition-all ease-in-out cursor-pointer"
            >
              OSVČ HUB
            </Link>
          </li> */}
        </ul>

        <LinkButton
          options={{
            color: "black",
            size: "middle",
            text: "Koupit roční členství",
            href: { href: stripePayment, target: "_blank" },
          }}
        />
      </div>
    </header>
  );
}
