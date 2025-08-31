import React from "react";
import HeroWithImage from "../_components/global/hero/HeroWithImage";
import heroImage from "../../public/SMS.png";
import SectionWrapper from "../_components/global/wrappers/SectionWrapper";
import { makeService, stripePayment } from "../_data/links";
import OneStringInputCta from "../_components/global/cta/OneStringInputCta";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      {" "}
      <SectionWrapper
        levelTwo={{
          className:
            "md:grid grid-cols-2 items-center flex flex-col items-center justify-center",
        }}
      >
        <HeroWithImage
          options={{
            image: {
              src: heroImage,
              alt: "phone",
              mobileVisibility: "hidden",
            },
            heading: "Jaké povinnosti čekají na živnostníky.",
            subheading: "Povinnosti OSVČ",
            text: `Podnikání jako OSVČ s sebou nese řadu zákonných povinností. Patří sem daňové přiznání, přehledy pro sociální správu a zdravotní pojišťovnu, pravidelné zálohy, ale i další méně známé povinnosti. A nároky stále přibývají.`,
            buttons: [
              {
                options: {
                  color: "black",
                  text: "Povinnosti a změny",
                  size: "middle",
                  href: {
                    href: stripePayment,
                  },
                  textAlign: "center",
                },
              },
              {
                options: {
                  color: "white",
                  text: "Chci službu",
                  size: "small",
                  href: { href: stripePayment, target: "_blank" },
                  textAlign: "start",
                },
              },
            ],
          }}
        />
      </SectionWrapper>
      <SectionWrapper>
        <OneStringInputCta
          options={{
            heading:
              "Chcete dostávat novinky o naší službě? Zanechte nám email.",
            subheading:
              "Budete dostávat pouze novinky týkající se naší služby, žádný zbytečný marketing.",
            dataDestination: makeService.emailWebhook,
            buttonText: "Přihlásit se k doběru",
            inputType: "email",
            placeholder: "Zde zadejte email",
          }}
        />
      </SectionWrapper>
    </>
  );
}
