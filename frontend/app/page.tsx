import Image from "next/image";
import Hero from "./_components/hero/Hero";
import Faq from "./_components/faq/Faq";
import Pricing from "./_components/pricing/Pricing";
import Fines from "./_components/fines/Fines";

export default function Home() {
  return (
    <>
      <Hero />
      <Fines />
      <Pricing />
      <Faq />
    </>
  );
}
