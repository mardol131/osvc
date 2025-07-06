import React from "react";

type Props = {};

function FineBox({ text, fine }: { text: string; fine: string }) {
  return (
    <div className="rounded-lg p-3 bg-primary text-textLight">
      <p className="text-lg font-semibold uppercase">
        Pokuta <span className="text-secondary">{fine}</span> Kč
      </p>
      <p className="font-semibold">{text}</p>
    </div>
  );
}

export default function Fines({}: Props) {
  return (
    <div className=" min-h-200 flex items-center justify-center px-10 border-b">
      <div className="max-w-wrapper flex flex-col gap-10">
        <div className="flex flex-col items-start gap-3">
          <p className="text-secondary font-bold uppercase">Pokuty</p>
          <h2 className="">Co hrozí při nedodržení povinností.</h2>
          <p className="text-xl font-semibold text-textP">
            Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
            když se něco změní. Už žádné pokuty ani stres z neznámých
            povinností.
          </p>{" "}
        </div>
        <div className="grid grid-cols-4 gap-5">
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
          <FineBox text="Pozdně podané daňové přiznání" fine="5 000" />
        </div>
      </div>
    </div>
  );
}
