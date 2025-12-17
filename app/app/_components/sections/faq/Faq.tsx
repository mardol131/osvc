import React from "react";
import Question from "./Question";
import HeadingCenter from "../../blocks/headings/HeadingCenter";
import { servicePrice } from "@/app/_data/pricing";

export default function Faq({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div
      id="faq"
      className="relative flex items-start justify-center md:px-10 px-4 md:py-30 py-20 overflow-hidden bg-white to-secondary/5"
    >
      {/* Dekorativní pozadí */}

      <div className="relative z-10 w-full flex flex-col gap-15 items-center text-center max-w-200">
        {showHeader && (
          <HeadingCenter
            heading="Často kladené otázky"
            subheading="FAQ"
            text="Chápeme, že kolem živnosti bývá hodně otázek. Vybrali jsme ty nejčastější, které nám kladete, a odpověděli na ně co nejjasněji. Pokud vás zajímá něco dalšího, nebojte se nám ozvat."
          />
        )}

        <div className="w-full flex flex-col gap-4 max-w-4xl">
          <Question
            heading="Co všechno hlídáte?"
            text="Hlídáme zákonné povinnosti a lhůty, které se týkají OSVČ. To zahrnuje daňové přiznání, přehledy pro OSSZ a zdravotní pojišťovnu, zálohy na sociální a zdravotní pojištění, různé registrace (např. ČT), ale i změny legislativy, které se mohou týkat vašeho podnikání. Službu pravidelně aktualizujeme podle platné legislativy."
          />
          <Question
            heading="Kde berete informace?"
            text="Využíváme oficiální zdroje jako zákony, vyhlášky, informace z webů ministerstev, ČSSZ, finanční správy, zdravotních pojišťoven a dalších relevantních institucí. Zároveň využíváme služby expertů, jejichž hlavní pracovní náplní je tyto změny a novinky sledovat."
          />
          <Question
            heading="Jak se dozvím, že se blíží nějaký termín?"
            text="Pošleme vám upozornění e-mailem nebo SMS zprávou. Vždy s dostatečným předstihem a jasným vysvětlením, co je třeba udělat."
          />

          <Question
            heading="Je služba jen pro živnostníky, nebo i pro firmy?"
            text="Služba je navržena především pro živnostníky (OSVČ), protože právě ti často podnikají bez účetní, právníka nebo jiného profesionálního zázemí. Stát od nich očekává splnění celé řady povinností, ale zároveň jim s ničím nepomůže a nic aktivně nepřipomíná."
          />
          <Question
            heading="Kolik služba stojí a co všechno zahrnuje?"
            text={`Cena je ${servicePrice} Kč za rok. Zahrnuje sledování všech důležitých termínů, upozorňování e-mailem i SMS zprávami, přehled povinností a přístup k jednoduchým návodům, formulářům a kalendáři.`}
          />
          <Question
            heading="Musím něco instalovat nebo se učit nový systém?"
            text="Ne. Služba funguje plně online přes váš e-mail a telefon. Žádná aplikace, žádné složité přihlašování. Vše důležité dostanete přímo od nás."
          />
        </div>
      </div>
    </div>
  );
}
