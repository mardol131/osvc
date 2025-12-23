import Benefits from "../_components/sections/Benefits";
import { benefitsData } from "../_data/benefitsData";

import OneStringInputCta from "../_components/blocks/OneStringInputCta";
import PricingTextAndBubble from "../_components/sections/pricing/PricingTextAndBubble";
import Hero from "./_components/Hero";
import Fines from "./_components/Fines";
import SMS from "./_components/SMS";
import About from "./_components/About";
import Faq from "../_components/sections/faq/Faq";
import SaleCodeBanner from "../_components/sections/banners/SaleCodeBanner";
import Comparison from "../_components/sections/Comparison";

export default function Home() {
  return (
    <>
      <Hero />

      {/* <TextDivider
        options={{
          text: "Abyste se už nemuseli bát zmeškaných a nečekaných povinností",
        }}
      /> */}
      <Fines />

      <Benefits benefitsData={benefitsData} />
      <PricingTextAndBubble
        text=" Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
              když se něco změní. Už žádné pokuty ani stres z neznámých
              povinností."
        heading={
          <>
            Jedna koruna denně.
            <br /> Celý rok ochrany.
          </>
        }
        subheading="Ceník"
        direction="horizontal"
      />
      <SMS />

      <Comparison />
      <div className="mt-20">
        <SaleCodeBanner />
      </div>

      <About />
      <Faq />
      <OneStringInputCta
        options={{
          heading: "Ještě se na to necítíte? Zanechte nám svůj email.",
          subheading:
            "Budeme Vás informovat pouze o novinkách v naší službě, žádný zbytečný marketing.",
          dataDestination: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ecomail/news`,
          buttonText: "Odebírat novinky",
          inputType: "email",
          placeholder: "Zde zadejte email",
        }}
      />
    </>
  );
}
