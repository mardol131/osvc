import Link from "next/link";
import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className=" min-h-200 flex items-center justify-center px-10 border-b">
      <div className=" w-full flex flex-col items-center gap-5 text-center max-w-200">
        <div className="flex flex-col items-center">
          <h1 className="">Vy podnikáte. My hlídáme byrokracii.</h1>
        </div>
        <p className="text-xl font-semibold text-textP">
          Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
          když se něco změní. Už žádné pokuty ani stres z neznámých povinností.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <a
            href="/"
            className="shadow-lg text-2xl font-semibold py-4 px-5 bg-linear-120 from-colorFrom to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald flex items-center justify-center"
          >
            Chci krýt záda
          </a>
          <Link
            href="#benefit"
            className="shadow-lg text-2xl font-semibold py-3 px-6 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center"
          >
            Jak to funguje
          </Link>
        </div>
      </div>
    </div>
  );
}
