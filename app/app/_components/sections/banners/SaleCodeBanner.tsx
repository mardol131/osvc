import React from "react";
import { IoGift, IoCheckmarkCircle } from "react-icons/io5";

type Props = {};

export default function SaleCodeBanner({}: Props) {
  return (
    <section className="relative py-16 md:px-10 px-4 overflow-hidden bg-linear-to-br from-primary via-zinc-800 to-zinc-900">
      {/* Dekorativní pozadí */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-linear-to-tl from-tertiary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-wrapper mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ikona */}
            <div className="shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-secondary to-tertiary rounded-lg flex items-center justify-center shadow-xl">
                <IoGift className="text-4xl md:text-5xl text-white" />
              </div>
            </div>

            {/* Obsah */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-textLight mb-3 font-bebas">
                Sdílej výhody s přáteli!
              </h3>
              <p className="text-lg text-zinc-300 mb-4 leading-relaxed">
                Při koupi předplatného získáš{" "}
                <span className="text-secondary font-bold">
                  slevový kód 20 %
                </span>
                , který můžeš předat přátelům, rodině nebo komukoliv jinému.
                Pomoz ostatním ušetřit a usnadni jim start!
              </p>

              {/* Benefity */}
              <div className="flex flex-col md:flex-row gap-4 max-md:items-center text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircle className="text-xl text-secondary shrink-0" />
                  <span>Platí na všechno</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircle className="text-xl text-secondary shrink-0" />
                  <span>Jednorázové použití</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircle className="text-xl text-secondary shrink-0" />
                  <span>Okamžitě po nákupu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
