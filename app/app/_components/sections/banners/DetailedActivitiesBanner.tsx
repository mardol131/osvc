import React from "react";

type Props = {};

export default function DetailedActivitiesBanner({}: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-20 px-2 py-20">
      <div className="max-w-wrapper w-full md:mx-10 mx-4 flex flex-col gap-5">
        <div className="relative bg-gradient-to-br from-secondary/10 via-white to-tertiary/10 border-2 border-secondary/30 rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto overflow-hidden">
          {/* Dekorativní prvek */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Vizuální akcent */}

            {/* Obsah */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl text-primary mb-4">
                Pomožte i ostatním. Slevový kód za každý první nákup.
              </h3>
              <p className="text-xl text-textP leading-relaxed">
                Po zakoupení předplatného obdržíte do emailu{" "}
                <span className="text-secondary">10% slevový kód</span>, který
                můžete předat přátelům, rodině nebo kolegům.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
