import Hero from "./_components/homepage/Hero";
import Faq from "./_components/homepage/Faq";
import Pricing from "./_components/homepage/Pricing";
import Fines from "./_components/homepage/Fines";
import Benefits from "./_components/homepage/Benefits";
import { benefitsData } from "./_data/benefitsData";
import Footer from "./_components/global/headerFooter/Footer";
import About from "./_components/homepage/About";
import TextSection from "./_components/homepage/TextSection";
import SMS from "./_components/homepage/SMS";
import OneStringInputCta from "./_components/global/cta/OneStringInputCta";
import { makeService } from "./_data/links";
import SectionWrapper from "./_components/global/wrappers/SectionWrapper";
import TextDivider from "./_components/global/dividers/textDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <TextDivider
        options={{
          text: "Abyste se už nemuseli bát zmeškaných a nečekaných povinností",
        }}
      />
      <Fines />
      <Benefits benefitsData={benefitsData} />
      <SMS />
      <Pricing />
      <About />
      <Faq />
      <SectionWrapper>
        <OneStringInputCta
          options={{
            heading: "Ještě se na to necítíte? Zanechte nám svůj email.",
            subheading:
              "Budeme Vás informovat pouze o novinkách v naší službě, žádný zbytečný marketing.",
            dataDestination: makeService.emailWebhook,
            buttonText: "Přihlásit se k doběru novinek",
            inputType: "email",
            placeholder: "Zde zadejte email",
          }}
        />
      </SectionWrapper>
      <Footer />
    </>
  );
}
