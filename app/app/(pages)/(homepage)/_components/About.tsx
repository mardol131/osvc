import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import React from "react";

export default function About() {
  return (
    <div
      id="about"
      className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20"
    >
      <div className="max-w-200 flex flex-col gap-10 items-center">
        <HeadingCenter
          subheading="O nás"
          heading="Proč to děláme?"
          text="Chcete to jednou větou? Už nás prostě nebaví neschopnost státu."
          mb={4}
        />
        <div className="text-lg flex flex-col gap-6 text-textP text-center">
          <p>
            <span className="text-xl text-primary">
              Podnikat v Česku znamená zvládat desítky povinností, nařízení a
              hlídání termínů
            </span>
            . Pro běžného člověka živnostníka, který chce jen dělat poctivou
            práci, je to skoro jako past. Každý úřad má vlastní systém, jiné
            přihlašování, jiné lhůty. Mění se termíny i pravidla.{" "}
            <span className="text-xl text-primary">
              Stát předpokládá, že všechno víte, a nepřispěje ani špetkou na to,
              aby Vám pomohl.
            </span>
          </p>
          <p>
            <span className="text-xl text-primary">
              Pokud něco nestihnete nebo nevíte, můžeš vás čekat pokuta i v
              řádech desetitisíců korun.
            </span>{" "}
            Ne proto, že byste chtěli něco obejít, ale protože vám to prostě
            nikdo nepřipomněl. Žádný úřad vám nenapíše: „Pozor, máte odevzdat
            přehled, zbývá 5 dní.“
          </p>
        </div>
        <h5>A tady začínáme my...</h5>
        <div className="text-lg flex flex-col gap-6 text-textP text-center">
          {" "}
          <p>
            <span className="text-xl text-primary">
              {" "}
              Státní systém už se nám nelíbí hodně dlouho. Chtěli jsme proto
              nabídnout službu, která hlídá zákonné povinnosti za Vás.
            </span>{" "}
            Sledování změn, připomínky termínů, upozornění e-mailem i SMS. Žádné
            zbytečné úřadování, žádné nepodstatné informace.
          </p>
        </div>
      </div>
    </div>
  );
}
