import Benefits from "../../_components/sections/Benefits";
import { benefitsData } from "../../_data/benefitsData";

import OneStringInputCta from "../../_components/blocks/OneStringInputCta";
import PricingTextAndBubble from "../../_components/sections/pricing/PricingTextAndBubble";
import Hero from "./_components/Hero";
import Fines from "./_components/Fines";
import SMS from "./_components/SMS";
import About from "./_components/About";
import Faq from "../../_components/sections/faq/Faq";
import DetailedActivitiesBanner from "../../_components/sections/banners/DetailedActivitiesBanner";
import Comparison from "../../_components/sections/Comparison";
import NoLearningCurve from "./_components/NoLearningCurve";

export default function Home() {
  return (
    <>
      <Hero />

      <Fines />

      <Benefits benefitsData={benefitsData} />

      <NoLearningCurve />

      <SMS />

      <PricingTextAndBubble
        text="Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět,
              když se něco změní. Už žádné pokuty ani stres z neznámých
              povinností."
        heading={
          <>
            Jedna koruna denně.
            <br /> Celý rok ochrany.
          </>
        }
        subheading="Kolik to stojí"
        direction="horizontal"
      />

      <Comparison />
      <About />

      <div className="mt-20">
        <DetailedActivitiesBanner />
      </div>

      <Faq />

      <OneStringInputCta />
    </>
  );
}
