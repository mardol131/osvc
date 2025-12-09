import Image from "next/image";
import React from "react";
import sms from "@/public/SMS.png";

export default function SMS() {
  return (
    <div
      id="price"
      className="relative flex items-center justify-center md:px-10 px-4 md:py-30 py-20 overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-secondary/5"
    >
      {/* Dekorativní pozadí */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-wrapper w-full md:grid flex flex-col-reverse grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Image
            src={sms}
            height={1000}
            width={1000}
            alt="Ukázka SMS upozornění"
            className="contrast-105 drop-shadow-2xl justify-self-start self-center md:self-start md:max-w-120 max-w-70"
          />
          {/* Dekorativní element kolem telefonu */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-4">
            <p className="text-secondary font-bold uppercase text-sm tracking-wide">
              Jak to vypadá v praxi
            </p>

            <h2 className="bg-gradient-to-br from-primary via-primary to-zinc-700 bg-clip-text text-transparent">
              Pouze čisté informace.
              <br /> Žádný spam.
            </h2>

            <p className="text-lg text-textP leading-relaxed">
              Na rozdíl od běžných zpráv od nás dostanete jen to nejdůležitější.
              Žádné reklamy ani zbytečné texty. Jen jasné a přehledné informace,
              díky kterým už nikdy nezapomenete na důležitý termín nebo platbu.
            </p>
          </div>

          {/* Příklady zpráv */}
          <div className="flex flex-col gap-3 mt-4">
            <h5 className="text-primary font-bold mb-2">Co vám přijde:</h5>

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
              <span className="text-secondary text-2xl flex-shrink-0">✓</span>
              <div>
                <p className="text-primary font-semibold text-sm mb-1">
                  Připomínka termínu
                </p>
                <p className="text-textP text-sm">
                  &ldquo;Do 15 dnů je třeba podat daňové přiznání&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
              <span className="text-secondary text-2xl flex-shrink-0">✓</span>
              <div>
                <p className="text-primary font-semibold text-sm mb-1">
                  Změna legislativy
                </p>
                <p className="text-textP text-sm">
                  &ldquo;Od příštího měsíce se mění sazby sociálního
                  pojištění&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
              <span className="text-secondary text-2xl flex-shrink-0">✓</span>
              <div>
                <p className="text-primary font-semibold text-sm mb-1">
                  Důležitá platba
                </p>
                <p className="text-textP text-sm">
                  &ldquo;Zítra je splatná záloha na zdravotní pojištění&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
