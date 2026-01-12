import React from "react";
import { IoTicketOutline } from "react-icons/io5";

type Props = {};

export default function DetailedActivitiesBanner({}: Props) {
  return (
    <section className="relative py-16 md:px-10 px-4 overflow-hidden bg-linear-to-br from-primary via-zinc-800 to-zinc-900">
      {/* Dekorativní pozadí */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-linear-to-tl from-tertiary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-wrapper mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Ikona */}
            <div className="w-20 h-20 shrink-0 bg-linear-to-br from-secondary to-tertiary rounded-lg flex items-center justify-center shadow-xl">
              <IoTicketOutline className="text-4xl md:text-5xl text-white" />
            </div>

            {/* Obsah */}
            <div className="flex-1 text-center flex flex-col justify-center md:text-left">
              <h3 className="text-textLight mb-3 font-bebas">
                Pomožte i ostatním. Slevový kód za každý první nákup.
              </h3>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Po zakoupení předplatného obdržíte do emailu{" "}
                <span className="text-secondary font-semibold">
                  10% slevový kód
                </span>
                , který můžete předat přátelům, rodině nebo kolegům.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
