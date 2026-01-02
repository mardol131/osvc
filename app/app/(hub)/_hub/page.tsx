import React from "react";
import HubSearch from "./_components/HubSearch";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";

export default function page() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "OSVČ HUB.",
          headingColor: "secondary",
          secondHeading:
            "Zdroje a nástroje, které pomůžou v každé fázi podnikání.",
          text: "Rady, odkazy, automatizace, účetnictví, fakturace, webové stránky, emailing, CRM a mnoho dalšího, co Vám může pomoci s podnikáním.",
          buttonsColumns: 1,
        }}
      />
      <HubSearch />
    </>
  );
}
