import React from "react";
import HeroMidAlign from "../../_components/sections/hero/HeroMidAlign";
import Faq from "@/app/_components/sections/faq/Faq";

export default function page({}) {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Často kladené otázky",
          text: "Najděte odpovědi na nejčastější otázky ohledně našich služeb a členství.",
          buttonsColumns: 1,
        }}
      />
      <Faq showHeader={false} />
    </>
  );
}
