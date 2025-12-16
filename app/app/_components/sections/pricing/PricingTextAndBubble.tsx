import React, { ReactNode } from "react";
import HeadingCenter from "../../blocks/headings/HeadingCenter";
import PricingCard from "./PricingCard";
import { BenefitsPoints } from "./PriceBenefit";
import HeadingLeft from "../../blocks/headings/HeadingLeft";
import SectionWrapper from "../../blocks/SectionWrapper";

type PricingTextAndBubble = {
  text: string;
  heading: ReactNode;
  subheading: string;
  direction: "vertical" | "horizontal";
};

export default function PricingTextAndBubble(props: PricingTextAndBubble) {
  return (
    <SectionWrapper id="price">
      {props.direction === "vertical" && (
        <div className="flex flex-col items-center gap-12">
          <HeadingCenter
            subheading={props.subheading}
            heading={props.heading}
            text={props.text}
          />

          <div className="w-full max-w-2xl">
            <PricingCard benefits={BenefitsPoints} />
          </div>
        </div>
      )}
      {props.direction === "horizontal" && (
        <div className="md:grid grid-cols-2 items-start gap-12">
          <div className="md:sticky md:top-24 mb-5">
            <HeadingLeft
              subheading={props.subheading}
              heading={props.heading}
              text={props.text}
            />
          </div>

          <PricingCard benefits={BenefitsPoints} />
        </div>
      )}
    </SectionWrapper>
  );
}
