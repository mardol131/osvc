import Image from "next/image";
import Hero from "./_components/homepage/Hero";
import Faq from "./_components/homepage/Faq";
import Pricing from "./_components/homepage/Pricing";
import Fines from "./_components/homepage/Fines";
import Benefits from "./_components/homepage/Benefits";
import { benefitsData } from "./_data/benefitsData";

export default function Home() {
  return (
    <>
      <Hero />
      <Fines />
      <Benefits benefitsData={benefitsData} />
      <Pricing />
      <Faq />
    </>
  );
}
