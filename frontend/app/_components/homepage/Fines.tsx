import React from "react";
import { FaHourglass } from "react-icons/fa";
import HeadingCenter from "../headings/HeadingCenter";

type Props = {
  finesData: {
    title: string;
    fine: string;
    description: string;
  }[];
};

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

export default function Fines({ finesData }: Props) {
  return (
    <div className=" min-h-200 flex items-center justify-center px-10 py-30">
      <div className="max-w-wrapper flex flex-col gap-10 items-center">
        <HeadingCenter
          subheading="Pokuty"
          heading="Co hrozí při nedodržení povinností."
          text="Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
            když se něco změní. Už žádné pokuty ani stres z neznámých
            povinností."
        />
        <div className="flex min-h-80 items-end justify-center">
          <div className="rounded-lg p-5 bg-zinc-950 text-textLight flex flex-col items-center justify-center text-center gap-3 h-80 w-70 -rotate-10 shrink-0 translate-x-20 shadow-xl hover:z-40 hover:scale-110 ease-in-out transition-all">
            <p className="font-semibold">
              Pokuta až <span className="text-secondary">300 000</span> Kč
            </p>
            <p className="text-2xl font-semibold">Nepodání daňového přiznání</p>
            <p className="">
              Pokuta za nepodání daňového přiznání činí až 5 % z daně, maximálně
              však 300 000 Kč. I v případě nulového zisku může být udělena
              sankce minimálně 500 Kč.
            </p>
          </div>
          <div className="rounded-lg p-5 bg-zinc-900 text-textLight flex flex-col items-center justify-center text-center gap-3 h-100 w-70 -rotate-5 shrink-0 translate-x-10 shadow-xl hover:z-40 hover:scale-110 ease-in-out transition-all">
            <p className="font-semibold">
              Pokuta až <span className="text-secondary">50 000</span> Kč
            </p>
            <p className="text-2xl font-semibold">
              Nedodání přehledu o příjmech a výdajích na OSSZ
            </p>
            <p className="">
              OSVČ musí každoročně dodat přehled na OSSZ. Jeho absence může být
              pokutována až 50 000 Kč, případně je možné vyměření z moci úřední.
            </p>
          </div>
          <div className="rounded-lg p-5 bg-primary text-textLight flex flex-col items-center justify-center text-center gap-3 w-80 h-110 shrink-0 z-20 shadow-xl hover:scale-110 ease-in-out transition-all">
            <p className="">
              Pokuta až <span className="text-secondary">10 000</span> Kč
            </p>
            <p className="text-2xl font-semibold">
              Nepřihlásení se k poplatku za televizi a rádio
            </p>
            <p className="">
              Do databáze ČT se musí zapsat i živnostníci bez zaměstnanců.
              Regulátor sám o této povinnosti prakticky neinformoval.
            </p>
          </div>
          <div className="rounded-lg p-5 bg-zinc-900 text-textLight flex flex-col items-center justify-center text-center gap-3 h-100 w-70 rotate-5 shrink-0 -translate-x-10 z-10 shadow-xl hover:z-40 hover:scale-110 ease-in-out transition-all">
            <p className="font-semibold">
              Pokuta <span className="text-secondary">0,05 %</span> denně
            </p>
            <p className="text-2xl font-semibold">
              Neodvedení záloh na sociální pojištění{" "}
            </p>
            <p className="">
              Dlouhodobé neplacení sociálního pojištění generuje penále (0,05 %
              denně) a může vést k exekuci a blokaci majetku.
            </p>
          </div>
          <div className="rounded-lg p-5 bg-zinc-950 text-textLight flex flex-col items-center justify-center text-center gap-3 h-80 w-70 rotate-10 shrink-0 -translate-x-20 z-0 shadow-xl hover:z-40 hover:scale-110 ease-in-out transition-all">
            <p className="font-semibold">
              Pokuta až <span className="text-secondary">1 000 000</span> Kč
            </p>
            <p className="text-2xl font-semibold">
              Nepodání kontrolního hlášení DPH{" "}
            </p>
            <p className="">
              Plátci DPH mají povinnost podávat kontrolní hlášení měsíčně nebo
              čtvrtletně. Nepodání může vést k pokutě až 1 milion Kč.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
