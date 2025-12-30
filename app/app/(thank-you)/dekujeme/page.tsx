import React from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaEnvelope,
  FaMobileAlt,
  FaCalendarAlt,
  FaHome,
} from "react-icons/fa";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import Button from "@/app/_components/atoms/Button";

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
          </h1>

          <p className="text-xl text-zinc-600 mb-8">
            Vaše předplatné bylo úspěšně aktivováno
          </p>

          {/* Informační box */}
          {/* <div className="bg-gradient-to-br from-primary via-zinc-800 to-zinc-900 rounded-2xl p-8 text-left shadow-xl border border-secondary/20 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl  text-white mb-6">Co se děje dál?</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-secondary text-xl" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-lg  text-white mb-1">
                      Potvrzovací e-mail
                    </h5>
                    <p className="text-zinc-300 text-sm">
                      Na váš e-mail jsme zaslali potvrzení o aktivaci
                      předplatného a přístupové údaje k účtu.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <FaMobileAlt className="text-secondary text-xl" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-lg  text-white mb-1">SMS upozornění</h5>
                    <p className="text-zinc-300 text-sm">
                      Začneme vás okamžitě informovat o důležitých termínech a
                      změnách v zákonech prostřednictvím SMS a e-mailů.
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-secondary text-xl" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-lg  text-white mb-1">
                      Sdílený kalendář
                    </h5>
                    <p className="text-zinc-300 text-sm">
                      Přístup ke sdílenému kalendáři s důležitými termíny
                      najdete v potvrzovacím e-mailu.
                    </p>
                  </div>
                </div>
          </div>
            </div>
          </div> */}

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
