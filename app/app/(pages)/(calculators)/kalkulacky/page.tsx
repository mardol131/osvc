import Button from "@/app/_components/atoms/Button";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import { TrendingUp, Coins, Heart, Calculator, BarChart3 } from "lucide-react";
import { calculators } from "@/app/_data/calculators";

export const metadata = {
  title: "OSVČ365: Kalkulačky pro OSVČ",
  description:
    "Objevte naše bezplatné kalkulačky pro OSVČ, které vám pomohou s výpočtem odvodů, daní a dalších podnikatelských povinností.",
};

export default function page() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Nástroje pro OSVČ",
          text: "Sada bezplatných kalkulaček, které vám pomůžou s nejčastějšími otázkami. Spočítejte si výši plateb na sociální a zdravotní pojištění, daně z příjmu, nebo třeba porovnejte, jestli se víc vyplatí využívat paušální výdaje nebo vstoupit do režimu paušální daně.",
          buttonsColumns: 1,
        }}
      />

      <SectionWrapper id="calculators">
        <div className="w-full">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              Dostupné kalkulačky
            </h2>
            <p className="text-lg text-textP">
              Vyberte si kalkulačku, která vás zajímá a spočítejte si své daně
              nebo odvody.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calculator) => (
              <div
                key={calculator.id}
                className="flex flex-col h-full bg-white border-2 border-zinc-200 rounded-xl p-8 hover:border-secondary hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-secondary">
                    <calculator.icon size={48} strokeWidth={1.5} />
                  </div>

                  <h4 className="text-2xl font-bebas mb-3 text-primary">
                    {calculator.title}
                  </h4>
                </div>

                <p className="text-textP mb-8 grow">{calculator.description}</p>

                <Button
                  variant="gold"
                  text="Přejít na kalkulátor"
                  size="md"
                  href={calculator.href}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* <SectionWrapper>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-linear-to-br from-secondary/10 to-transparent rounded-xl p-8 border border-secondary/20">
            <div className="text-3xl font-bebas mb-3">Jednoduché</div>
            <p className="text-textP">
              Všechny kalkulačky jsou navrženy tak, aby byly intuitivní a snadné
              na používání.
            </p>
          </div>

          <div className="bg-linear-to-br from-secondary/10 to-transparent rounded-xl p-8 border border-secondary/20">
            <div className="text-3xl font-bebas mb-3">Přesné</div>
            <p className="text-textP">
              Počítáme s aktuálními sazbami a limity na rok 2025 a dále.
            </p>
          </div>

          <div className="bg-linear-to-br from-secondary/10 to-transparent rounded-xl p-8 border border-secondary/20">
            <div className="text-3xl font-bebas mb-3">Zdarma</div>
            <p className="text-textP">
              Všechny kalkulačky jsou kompletně zdarma bez jakýchkoli skrytých
              poplatků.
            </p>
          </div>
        </div>
      </SectionWrapper> */}

      <OneStringInputCta
        options={{
          heading: "Chcete vše na jednom místě?",
          subheading:
            "OSVC365 vám sleduje všechny povinnosti a upozorňuje na termíny automaticky.",
          dataDestination: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ecomail/news`,
          buttonText: "Koupit službu",
          inputType: "email",
          placeholder: "Zde zadejte email",
        }}
      />
    </>
  );
}
