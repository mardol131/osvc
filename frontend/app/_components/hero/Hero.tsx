import Link from "next/link";
import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className=" min-h-200 flex items-center justify-center px-10">
      <div className=" w-full flex flex-col items-center gap-5 text-center max-w-200">
        <div className="flex flex-col items-center">
          <p className="text-lg uppercase">Informační služba pro podnikatele</p>
          <h1>Přestaňte se spoléhat na stát</h1>
        </div>
        <p className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          libero quam
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <a
            href="/"
            className="text-2xl font-semibold py-4 px-5 bg-primary text-textLight rounded-full font-oswald flex items-center justify-center"
          >
            Koupit
          </a>
          <Link
            href="#benefit"
            className="text-2xl font-semibold py-4 px-5 border-3 border-primary  rounded-full font-oswald flex items-center justify-center"
          >
            Proč to chtít?
          </Link>
        </div>
      </div>
    </div>
  );
}
