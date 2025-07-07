import Link from "next/link";
import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className=" flex items-center justify-center px-10 py-30 pt-60">
      <div className=" w-full flex flex-col items-center gap-5 text-center max-w-200">
        <div className="flex flex-col items-center">
          <h1 className="">
            Vy podnikáte. <br />
            My hlídáme byrokracii.
          </h1>
        </div>
        <p className="text-2xl text-textP">
          Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
          když se něco změní. Už žádné pokuty ani stres z neznámých povinností.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <a
            href="/"
            className="shadow-lg text-2xl uppercase font-semibold py-4 px-5 bg-linear-150 from-tertiary to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald flex items-center justify-center"
          >
            Chci krýt záda
          </a>
          <Link
            href="#benefit"
            className="shadow-lg text-2xl uppercase font-semibold py-3 px-6 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out"
          >
            Jak to funguje
          </Link>
        </div>
      </div>
    </div>
  );
}
