import Hero from "./_components/homepage/Hero";
import Faq from "./_components/homepage/Faq";
import Pricing from "./_components/homepage/Pricing";
import Fines from "./_components/homepage/Fines";
import Benefits from "./_components/homepage/Benefits";
import { benefitsData } from "./_data/benefitsData";
import Footer from "./_components/headerFooter/Footer";
import About from "./_components/homepage/About";
import TextSection from "./_components/homepage/TextSection";
import CTA from "./_components/homepage/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TextSection />
      <Fines />
      <Benefits benefitsData={benefitsData} />
      <Pricing />
      <About />
      <Faq />
      <CTA />
      <Footer />
    </>
  );
}
