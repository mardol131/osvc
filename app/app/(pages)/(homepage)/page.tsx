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
        text={
          <>
            <p>
              V předplatném jsou zahrnuta upozornění přes SMS i email a měsíční
              přehledy novinek a povinností. Na push notifikacích pracujeme.{" "}
              <span className="text-secondary">
                Žádné skryté cena ani doplatky za velké množství notifikací
                nevedeme
              </span>
              . Chceme, abyste byli informování celý rok, a to nezávisle na tom,
              kolik změn se stane.
            </p>
          </>
        }
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
