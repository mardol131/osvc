import Image from "next/image";
import React from "react";
import sms from "./../../../public/SMS.png";

export default function SMS() {
  return (
    <div
      id="price"
      className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20"
    >
      <div className=" max-w-wrapper w-full md:grid flex flex-col-reverse grid-cols-2 gap-10 rounded-3xl">
        <Image
          src={sms}
          height={500}
          width={500}
          alt="sms-example"
          className="contrast-110 justify-self-start max-w-120"
        />

        <div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-secondary font-bold uppercase">
              Jak to vypadá v praxi
            </p>
            <h2 className="">
              Pouze čisté informace.
              <br /> Žádný spam.
            </h2>
            <p className="text-lg text-textP">
              Na rozdíl od běžných zpráv od nás dostanete jen to nejdůležitější.
              Žádné reklamy ani zbytečné texty. Jen jasné a přehledné informace,
              díky kterým už nikdy nezapomenete na důležitý termín nebo platbu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
