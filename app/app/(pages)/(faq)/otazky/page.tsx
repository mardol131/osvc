import React from "react";
import HeroMidAlign from "../../../_components/sections/hero/HeroMidAlign";
import Faq from "@/app/_components/sections/faq/Faq";

export const metadata = {
  title: "OSVČ365: Často kladené otázky",
  description:
    "Hledáte odpovědi na nejčastější otázky k OSVČ365? Zjistěte vše o službách, předplatném, funkcích a výhodách předplatného. Přehledné FAQ pro podnikatele a zájemce o naše služby.",
};

export default function page({}) {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Často kladené otázky",
          text: "Najděte odpovědi na nejčastější otázky ohledně našich služeb a předplatného.",
          buttonsColumns: 1,
        }}
      />
      <Faq showHeader={false} />
    </>
  );
}
