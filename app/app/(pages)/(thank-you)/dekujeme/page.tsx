import Button from "@/app/_components/atoms/Button";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Děkujeme za vaši objednávku",
  description:
    "Děkujeme za vaši objednávku! Služba je nyní aktivní. Zkontrolujte svůj e-mail pro potvrzení a další informace.",
};

export default function Page() {
  return (
    <SectionWrapper>
      <div className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Ikona úspěchu */}
          {/* <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-8 shadow-2xl">
                <FaCheckCircle className="text-white text-6xl" />
              </div>
            </div>
          </div> */}

          {/* Hlavní nadpis */}
          <h1 className="text-4xl md:text-5xl  text-zinc-800 mb-4">
            Děkujeme za vaši objednávku!
            <br />
            Služba je teď aktivní.
          </h1>

          <p className="text-xl text-zinc-600 mb-8">
            Pro správné fungování jděte prosím do emailové schránky a{" "}
            <span className="font-semibold">
              adresu, ze které jsme vám poslali potvrzovací zprávu, zařaďte do
              běžné pošty nebo ji zaškrtněte, že nejde o spam.
            </span>{" "}
            Pokud email nevidíte, zkuste vyčkejte prosím pár minut nebo se
            podívejte do složky spamu.
          </p>

          {/* Tlačítka */}
          <Button text="Zpět na hlavní stránku" variant="gold" href="/" />

          {/* Dodatečné info */}
          <div className="mt-12 p-6 bg-zinc-50 rounded-xl border border-zinc-200">
            <h3 className=" text-zinc-800 mb-2">Potřebujete pomoc?</h3>
            <p className="text-zinc-600 text-sm">
              V případě jakýchkoliv dotazů nás neváhejte kontaktovat na e-mailu{" "}
              <a
                href="mailto:info@osvc365.cz"
                className="text-secondary hover:underline "
              >
                info@osvc365.cz
              </a>
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
