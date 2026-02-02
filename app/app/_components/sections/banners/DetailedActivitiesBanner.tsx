import React from "react";

type Props = {};

export default function DetailedActivitiesBanner({}: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-20 px-4 py-24">
      <div className="max-w-7xl w-full flex flex-col gap-8">
        <div className="text-center bg-white border border-gray-200 rounded-xl p-10 shadow-md">
          <h3 className="text-2xl md:text-3xl text-gray-800 mb-4">
            Pomožte i ostatním. Slevový kód za každý první nákup.
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Po zakoupení předplatného obdržíte do emailu{" "}
            <span className="text-secondary font-medium">10% slevový kód</span>,
            který můžete předat přátelům, rodině nebo kolegům.
          </p>
        </div>
      </div>
    </div>
  );
}
