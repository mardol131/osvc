import React from "react";
import HeadingCenter from "../global/headings/HeadingCenter";
import { GoAlertFill } from "react-icons/go";

export default function Fines() {
  return (
    <div className=" min-h-200 flex items-center justify-center xl:px-10 px-4 xl:py-30 py-20">
      <div className="max-w-wrapper flex flex-col gap-10 items-center">
        <HeadingCenter
          subheading="Pokuty"
          heading="Stát neupozorňuje. Jen trestá."
          text="Nepodali jste formulář včas? Zapomněli jste na povinné oznámení? Netušili jste, že Vám vznikla nová povinnost? Stát Vás na to neupozorní, ale pokutu zašle bez váhání."
        />
        <div className="flex xl:flex xl:items-end md:grid md:items-stretch grid-cols-2 xl:gap-0 gap-5 xl:flex-row flex-col min-h-80 items-end justify-center">
          <div className="rounded-xl p-5 xl:bg-zinc-950 bg-primary text-textLight flex flex-col items-center justify-center text-center gap-3 xl:h-80 xl:max-w-70 w-full xl:-rotate-10 xl:shrink-0 xl:translate-x-20 xl:shadow-xl xl:hover:z-40 xl:hover:scale-110 xl:ease-in-out xl:transition-all xl:hover:rotate-0 z-0">
            <div className="flex items-center gap-2">
              <GoAlertFill className="text-xl text-secondary" />
              <p className="font-semibold">
                Pokuta až <span className="text-secondary">300 000</span> Kč
              </p>
            </div>
            <p className="md:text-2xl text-xl font-semibold">
              Nepodání daňového přiznání
            </p>
            <p className="">
              Pokuta za nepodání daňového přiznání činí až 5 % z daně, maximálně
              však 300 000 Kč. I v případě nulového zisku může být udělena
              sankce minimálně 500 Kč.
            </p>
          </div>
          <div className="rounded-xl p-5 xl:bg-zinc-900 bg-primary text-textLight flex flex-col items-center justify-center text-center gap-3 xl:h-100 xl:max-w-70 w-full xl:-rotate-5 xl:shrink-0 xl:translate-x-10 xl:shadow-xl xl:hover:z-40 xl:hover:scale-110 ease-in-out transition-all xl:hover:rotate-0 z-10">
            <div className="flex items-center gap-2">
              <GoAlertFill className="text-xl text-secondary" />
              <p className="font-semibold">
                Pokuta až <span className="text-secondary">50 000</span> Kč
              </p>
            </div>
            <p className="md:text-2xl text-xl font-semibold">
              Nedodání přehledu o příjmech a výdajích na OSSZ
            </p>
            <p className="">
              OSVČ musí každoročně dodat přehled na OSSZ. Jeho absence může být
              pokutována až 50 000 Kč, případně je možné vyměření z moci úřední.
            </p>
          </div>
          <div className="col-span-2 rounded-xl p-5 xl:bg-primary bg-primary text-textLight flex flex-col items-center justify-center text-center gap-3 xl:max-w-80 w-full xl:h-110 xl:shrink-0 xl:z-20 xl:shadow-xl xl:hover:scale-110 ease-in-out transition-all hover:rotate-0 z-20">
            <div className="flex items-center gap-2">
              <GoAlertFill className="text-xl text-secondary" />
              <p className="">
                Pokuta až <span className="text-secondary">10 000</span> Kč
              </p>
            </div>
            <p className="md:text-2xl text-xl font-semibold">
              Nepřihlášení se k poplatku za televizi a rádio
            </p>
            <p className="">
              Do databáze ČT se musí zapsat i živnostníci bez zaměstnanců.
              Regulátor sám o této povinnosti prakticky neinformoval.
            </p>
          </div>
          <div className="rounded-xl p-5 xl:bg-zinc-900 bg-primary text-textLight flex flex-col items-center justify-center text-center gap-3 xl:h-100 xl:max-w-70 w-full xl:rotate-5 xl:shrink-0 xl:-translate-x-10 xl:z-10 xl:shadow-xl xl:hover:z-40 xl:hover:scale-110 ease-in-out transition-all hover:rotate-0 z-10">
            <div className="flex items-center gap-2">
              <GoAlertFill className="text-xl text-secondary" />
              <p className="font-semibold">
                Pokuta <span className="text-secondary">0,05 %</span> denně
              </p>
            </div>
            <p className="md:text-2xl text-xl font-semibold">
              Neodvedení záloh na sociální pojištění{" "}
            </p>
            <p className="">
              Dlouhodobé neplacení sociálního pojištění generuje penále (0,05 %
              denně) a může vést k exekuci a blokaci majetku.
            </p>
          </div>
          <div className="rounded-xl p-5 xl:bg-zinc-950 bg-primary text-textLight flex flex-col items-center justify-center text-center gap-3 xl:h-80 xl:max-w-70 w-full xl:rotate-10 xl:shrink-0 xl:-translate-x-20 xl:z-0 xl:shadow-xl xl:hover:z-40 xl:hover:scale-110 ease-in-out transition-all xl:hover:rotate-0 z-0">
            <div className="flex items-center gap-2">
              <GoAlertFill className="text-xl text-secondary" />
              <p className="font-semibold">
                Pokuta až <span className="text-secondary">1 000 000</span> Kč
              </p>
            </div>
            <p className="md:text-2xl text-xl font-semibold">
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
