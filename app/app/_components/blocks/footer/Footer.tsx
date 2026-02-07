import Link from "next/link";
import React from "react";
import Button from "../../atoms/Button";
import { HiHome, HiCurrencyDollar, HiQuestionMarkCircle } from "react-icons/hi";
import { MdEmail, MdPhone, MdBusiness } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { calculators } from "@/app/_data/calculators";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-linear-to-br from-primary via-zinc-800 to-zinc-900 overflow-hidden max-lg:pb-20"
    >
      {/* Dekorativní pozadí */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-center md:px-10 px-4 py-20">
        <div className="max-w-wrapper w-full">
          {/* Hlavní obsah */}
          <div className="grid md:grid-cols-4 grid-cols-1 gap-12 mb-12">
            {/* Stránky */}
            <div className="flex flex-col gap-4">
              <h4 className="text-textLight mb-2">Stránky</h4>
              <Link
                href="/"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <HiHome className="text-secondary" />
                Domů
              </Link>
              <Link
                href="/cena"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <HiCurrencyDollar className="text-secondary" />
                Cena
              </Link>
              {/* <Link
                href="/hub"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200"
              >
                Hub
              </Link> */}
              <Link
                href="/otazky"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <HiQuestionMarkCircle className="text-secondary" />
                Otázky
              </Link>
            </div>
            {/* Kontakt */}
            <div className="flex flex-col gap-4">
              <h4 className="text-textLight mb-2">Kontakt</h4>
              <a
                href="mailto:info@osvc365.cz"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <MdEmail className="text-secondary" />
                info@osvc365.cz
              </a>
              <a
                href="tel:+420735202345"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <MdPhone className="text-secondary" />
                +420 735 202 345
              </a>
              <p className="text-zinc-300 flex items-center gap-2">
                <MdBusiness className="text-secondary" />
                IČO: 10796509
              </p>
            </div>
            {/* Dokumenty */}
            <div className="flex flex-col gap-4">
              <h4 className="text-textLight mb-2">Dokumenty</h4>
              <Link
                href="/obchodni-podminky.pdf"
                target="_blank"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <IoDocument className="text-secondary" />
                Obchodní podmínky
              </Link>
              <Link
                href="/gdpr.pdf"
                target="_blank"
                className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <IoDocument className="text-secondary" />
                Ochrana osobních údajů (GDPR)
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-textLight mb-2">Nástroje</h4>
              {calculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.id}
                    href={calc.href}
                    className="text-zinc-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
                  >
                    <Icon className="text-secondary w-5 h-5" />
                    {calc.title}
                  </Link>
                );
              })}
            </div>{" "}
          </div>
          {/* Členství */}
          <div className="flex flex-col w-full gap-4 mb-5">
            <h4 className="text-textLight mb-2">Váš účet</h4>
            <div className="flex gap-5 w-full">
              {" "}
              <div className="flex flex-col gap-4">
                <Button
                  text="Spravovat předplatné"
                  href="/administrace/sprava-predplatneho"
                  target="_blank"
                  size="sm"
                />

                <p className="text-zinc-400 text-sm">
                  Zde můžete spravovat své předplatné.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  text="Zrušit předplatné"
                  href={process.env.NEXT_PUBLIC_SUB_ACCOUNT_LINK}
                  target="_blank"
                  size="sm"
                  variant="plain"
                />

                <p className="text-zinc-400 text-sm">
                  Pokud chcete předplatné zrušit
                </p>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent mb-8"></div>

          {/* Bottom bar */}
          <div className="flex md:flex-row flex-col md:justify-between items-center gap-4 text-zinc-400 text-sm">
            <p>
              © {new Date().getFullYear()} OSVČ365. Všechna práva vyhrazena.
            </p>
            {/* Nástroje - Kalkulačky */}

            <p className="text-zinc-500">
              Pomáháme živnostníkům zvládat byrokracii
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
