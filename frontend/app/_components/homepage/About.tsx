import React from "react";
import HeadingCenter from "../headings/HeadingCenter";

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
        />
        <div className="text-lg flex flex-col gap-6 text-textP text-center">
          {" "}
          <p>
            <span className="text-xl text-primary">
              Největším nepřítelem každého podnikatele je zpravidla úředník
            </span>
            . Lidé odříznutí od reality, kterí jsou placení z daní, se snaží
            rozhodovat o světě za zdmi jejich kanceláře. Nikdy to pořádně
            nefungovalo, nikdy to ani dobře fungovat nemůže. Důvod je celkem
            jednoduchý -{" "}
            <span className="text-xl text-primary">
              chybí expertíza, motivace a osobní zájem. Tedy přesně to, co dělá
              podnikatele podnikatelem
            </span>
            .
          </p>
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
              Pokud něco nestihnete nebo nevíte, čeká vás pokuta v řádu tisíců
              až statisíců korun.
            </span>{" "}
            Ne proto, že byste chtěli něco obejít, ale protože vám to prostě
            nikdo nepřipomněl. Žádný úřad vám nenapíše: „Pozor, máte odevzdat
            přehled, zbývá 5 dní.“ Místo toho se spoléhá, že zapomenete, protože
            do státní kasy se přeci peníze nějak dostat musí.
          </p>
        </div>
        <h4>A tady začínáme my...</h4>
        <div className="text-lg flex flex-col gap-6 text-textP text-center">
          {" "}
          <p>
            <span className="text-xl text-primary">
              {" "}
              Systém už nám leze krkem dlouho. Rozhodli jsme se proto založit
              jednoduchou službu, která hlídá zákonné povinnosti za Vás.
            </span>{" "}
            Sledování změn, připomínky termínů, upozornění e-mailem i SMS. Žádné
            zbytečné úřadování. Jen klid, že na nic nezapomenete a že vás nějaký
            ouřada nedostane kvůli hloupému termínu.
          </p>
          <p className="text-xl text-tertiary">
            Tenhle projekt vznikl proto, že stát selhává v úplném základu -
            srozumitelně informovat občany. A nás už to prostě nebaví.
          </p>
        </div>
      </div>
    </div>
  );
}
