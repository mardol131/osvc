import Button from "@/app/_components/atoms/Button";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import { TrendingUp, Coins, Heart, Calculator, BarChart3 } from "lucide-react";

const calculators = [
  {
    id: "odvody-osvc",
    title: "Kalkulačka odvodů OSVČ",
    description:
      "Spočítejte si, kolik budete muset platit na sociální a zdravotní pojištění podle vašich příjmů.",
    icon: Coins,
    href: "/kalkulacky/odvody-osvc",
  },
  {
    id: "zdravotni-pojisteni",
    title: "Kalkulačka zdravotního pojištění",
    description:
      "Zjistěte částku zdravotního pojištění pro OSVČ podle vašeho odhadu příjmů.",
    icon: Heart,
    href: "/kalkulacky/zdravotni-pojisteni",
  },
  {
    id: "socialni-pojisteni",
    title: "Kalkulačka sociálního pojištění",
    description:
      "Zjistěte částku sociálního pojištění pro OSVČ podle vašeho odhadu příjmů.",
    icon: Heart,
    href: "/kalkulacky/socialni-pojisteni",
  },
  {
    id: "dan-z-prijmu",
    title: "Kalkulačka daně z příjmů",
    description:
      "Spočítejte si, kolik budete platit na dani z příjmů podle vašich tržeb a výdajů.",
    icon: Calculator,
    href: "/kalkulacky/dan-z-prijmu",
  },
  {
    id: "pausalni-dan-vs-pausalni-naklady",
    title: "Paušální náklady vs. paušální daň",
    description:
      "Porovnejte, která forma zdanění je pro vás výhodnější - paušální náklady nebo paušální daň.",
    icon: BarChart3,
    href: "/kalkulacky/pausalni-dan-vs-pausalni-naklady",
  },
];

export default function page() {
  return (
    <>
      <HeroMidAlign
        options={{
          heading: "Nástroje pro OSVČ",
          text: "Sada bezplatných kalkulaček, které vám pomůžou s nejčastějšími otázkami. Spočítejte si pokud máte povinnost DPH, kolik budete platit na pojištění, a další.",
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
              Vyberte si kalkulačku, která vás zajímá a spočítejte si své
              situaci.
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
