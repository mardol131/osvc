import React from "react";

import HubSearch from "../_components/hub/HubSearch";

export default function page() {
  return (
    <>
      <div className="bg-primary/30 w-60 h-80 fixed -z-20 top-[50%] left-[70%] rotate-45 animate-moveOne"></div>
      <div className="bg-secondary rounded-full w-100 h-100 fixed -z-20 top-[20%] left-[25%] rotate-45 animate-moveOne"></div>
      <div className="bg-white/80 z-10 backdrop-blur-3xl">
        <div className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20 pt-30 md:pt-60">
          <div className=" w-full flex flex-col items-center gap-5 text-center max-w-200">
            <div className="flex flex-col items-center">
              <h1 className="">
                OSVČ HUB. <br />
                Rady a nástroje do začátku.
              </h1>
            </div>
            <p className="md:text-2xl text-lg text-textP">
              Rady, odkazy, automatizace, účetnictví, fakturace, webové stránky,
              emailing, CRM a mnoho dalšího, co Vám může pomoci s podnikáním.
            </p>
          </div>
        </div>
        <HubSearch />
      </div>
    </>
  );
}
