import React from "react";
import SectionWrapper from "../blocks/SectionWrapper";
import HeadingLeft from "../blocks/headings/HeadingLeft";

type Props = {};

export default function EntitiesWithoutLegalAdvice({}: Props) {
  return (
    <SectionWrapper
      levelTwo={{
        className: "md:p-10 p-5 rounded-2xl bg-zinc-50",
      }}
    >
      <div className="flex flex-col gap-8">
        <HeadingLeft
          heading={"Většina si musí poradit vlastními silami."}
          subheading="Nejste jediní"
          text="Většina aktivních živnostníků nemá poradce ani účetního. Termíny si hlídají sami. Zapomenutí pak znamená zbytečné pokuty. Přitom by měli mít čas hlavně na podnikání, ne na úřední kalendář."
        />

        <div className="flex flex-col gap-8">
          {/* Vizuální graf */}
          <div className="relative">
            {/* Hlavní bar - desktop verze (horizontální) */}
            <div className="hidden md:flex w-full h-32 rounded-xl overflow-hidden shadow-xl">
              {/* OSVČ bez účetního */}
              <div
                className="h-full bg-gradient-to-r from-tertiary via-secondary to-tertiary flex items-center justify-center relative"
                style={{ width: "38.4%" }}
              >
                <div className="text-center">
                  <p className="text-white font-semibold text-xl">770 000</p>
                  <p className="text-white/90 text-sm uppercase">
                    bez účetního
                  </p>
                </div>
              </div>

              {/* Aktivních OSVČ (zbytek) */}
              <div
                className="h-full bg-gradient-to-r from-secondary/30 via-secondary/50 to-tertiary/30 flex items-center justify-center"
                style={{ width: "16.4%" }}
              >
                <div className="text-center">
                  <p className="text-primary font-semibold text-xl">330 000</p>
                  <p className="text-primary/70 text-xs uppercase">s účetním</p>
                </div>
              </div>

              {/* Neaktivních OSVČ */}
              <div
                className="h-full bg-zinc-200 flex items-center justify-center"
                style={{ width: "45.2%" }}
              >
                <div className="text-center">
                  <p className="text-zinc-600 font-semibold text-xl">900 000</p>
                  <p className="text-zinc-500 text-xs uppercase">neaktivních</p>
                </div>
              </div>
            </div>

            {/* Mobilní verze (vertikální bary s různými délkami) */}
            <div className="flex md:hidden flex-col gap-4">
              {/* Neaktivních OSVČ - 900 000 (nejdelší - 100%) */}
              <div
                className="h-20 bg-zinc-200 flex items-center justify-center rounded-xl shadow-xl"
                style={{ width: "100%" }}
              >
                <div className="text-center">
                  <p className="text-zinc-600 font-semibold text-sm">900 000</p>
                  <p className="text-zinc-500 text-xs uppercase">neaktivních</p>
                </div>
              </div>

              {/* OSVČ bez účetního - 770 000 (střední - 85.6%) */}
              <div
                className="h-20 bg-gradient-to-r from-tertiary via-secondary to-tertiary flex items-center justify-center rounded-xl shadow-xl"
                style={{ width: "85.6%" }}
              >
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">770 000</p>
                  <p className="text-white/90 text-xs uppercase">
                    bez účetního
                  </p>
                </div>
              </div>

              {/* Aktivních OSVČ s účetním - 330 000 (nejkratší - 36.7%) */}
              <div
                className="h-20 bg-gradient-to-r from-secondary/30 via-secondary/50 to-tertiary/30 flex items-center justify-center rounded-xl shadow-xl"
                style={{ width: "36.7%" }}
              >
                <div className="text-center">
                  <p className="text-primary font-semibold text-sm">330 000</p>
                  <p className="text-primary/70 text-xs uppercase">s účetním</p>
                </div>
              </div>
            </div>

            {/* Popisky pod grafem */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-tertiary via-secondary to-tertiary flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-lg text-primary">770 000</p>
                  <p className="text-sm text-textP">OSVČ bez účetního</p>
                  <p className="text-xs text-secondary font-semibold">
                    70 % z aktivních
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-secondary/40 to-tertiary/40 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-lg text-primary">
                    1 100 000
                  </p>
                  <p className="text-sm text-textP">Aktivních OSVČ celkem</p>
                  <p className="text-xs text-secondary font-semibold">
                    52 % ze všech
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-4 h-4 rounded-full bg-zinc-300 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-lg text-primary">
                    2 100 000
                  </p>
                  <p className="text-sm text-textP">Celkem OSVČ</p>
                  <p className="text-xs text-zinc-500 font-semibold">100 %</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zvýraznění hlavního sdělení */}
          <div className="bg-gradient-to-r from-secondary/10 to-tertiary/10 p-6 rounded-xl border-l-4 border-secondary">
            <p className="text-xl md:text-2xl text-primary font-bebas">
              <span className="text-secondary font-semibold">70 %</span>{" "}
              aktivních OSVČ nemá účetního ani daňového poradce a musí si hlídat
              vše sami.
            </p>
          </div>
        </div>
        <a href="https://www.businessinfo.cz/clanky/pocet-osvc-se-opet-prehoupl-pres-dvoumilionovou-hranici/">
          * Čísla jsou zaokrouhlena
        </a>
      </div>
    </SectionWrapper>
  );
}
