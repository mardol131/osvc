import Button from "@/app/_components/atoms/Button";
import OneStringInputCta from "@/app/_components/blocks/OneStringInputCta";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import InfoCard from "@/app/_components/molecules/calculator/InfoCard";
import HeroMidAlign from "@/app/_components/sections/hero/HeroMidAlign";
import { calculators } from "@/app/_data/calculators";
import { BiQuestionMark } from "react-icons/bi";

export const metadata = {
  title: "OSVČ365: Kalkulačky pro OSVČ",
  description:
    "Vyzkoušejte online kalkulačky pro OSVČ. Spočítejte si jednoduše daně, sociální a zdravotní pojištění nebo porovnejte různé daňové režimy. Získejte přehled o svých povinnostech a optimalizujte své podnikání.",
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
                  text="Přejít na kalkulačku"
                  size="md"
                  href={calculator.href}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mt-12 flex flex-col gap-10">
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Co je sociální a zdravotní pojištění?"
            description="Sociální a zdravotní pojištění jsou povinné platby, které musí OSVČ pravidelně odvádět státu. Tyto odvody zajišťují přístup ke zdravotní péči v případě nemoci, úrazu nebo mateřství a zároveň tvoří základ pro budoucí důchod. Výše těchto odvodů se liší podle typu vykonávané činnosti (hlavní nebo vedlejší) a dosažených příjmů. Pravidelné placení těchto pojištění je klíčové pro zajištění sociální stability a ochrany v různých životních situacích. Pokud OSVČ neplatí tyto odvody, může přijít o nárok na některé dávky nebo být penalizován."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Jak se odvody počítají?"
            description="Výše sociálního a zdravotního pojištění se odvíjí od minimálních záloh, které jsou stanoveny zákonem, a od skutečných příjmů OSVČ. Pokud jsou vaše příjmy vyšší než minimální základ, odvody se zvyšují podle dosaženého zisku. Každý rok je nutné podat přehled o příjmech a výdajích, na jehož základě se vypočítá přesná výše odvodů na další období. Kalkulačka vám pomůže jednoduše zjistit, kolik musíte měsíčně a ročně odvádět podle vaší aktuální situace a předejít tak případným nedoplatkům."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Co je to daň z příjmu?"
            description="Daň z příjmu je povinná platba, kterou musí OSVČ odvádět státu ze svých zdanitelných příjmů. Tato daň je jedním z hlavních zdrojů financování veřejných služeb, jako je školství, zdravotnictví nebo infrastruktura. Výše daně závisí na celkových příjmech, odečitatelných položkách, uplatněných slevách na dani a případných daňových zvýhodněních. Správné vyplnění daňového přiznání a znalost aktuálních pravidel vám může ušetřit peníze i starosti při kontrole ze strany finančního úřadu."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Jak se daň z příjmu počítá?"
            description="Výpočet daně z příjmu OSVČ začíná zjištěním rozdílu mezi příjmy a výdaji, tedy základu daně. Z tohoto základu se odečítají nezdanitelné části základu a uplatňují se slevy na dani, například na poplatníka, děti nebo manžela/manželku. Výsledná částka je pak skutečnou daňovou povinností. Je důležité sledovat aktuální limity a možnosti odpočtů, protože správné uplatnění všech nároků může výrazně snížit celkovou daňovou zátěž."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Co je to paušální daň a jak se počítá?"
            description="Paušální daň je speciální režim pro OSVČ, který umožňuje platit jednu pevně stanovenou částku měsíčně, zahrnující daň z příjmu, sociální i zdravotní pojištění. Tento režim je vhodný pro podnikatele s nižšími příjmy, kteří chtějí zjednodušit administrativu a mít jasný přehled o svých odvodech. Výše paušální daně se každoročně mění podle legislativy a je rozdělena do několika pásem podle výše příjmů. Paušální daň může být výhodná, pokud nesplňujete podmínky pro uplatnění vysokých výdajových paušálů nebo nemáte nárok na většinu daňových slev."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Co hrozí při neplacení?"
            description="Pokud OSVČ neplatí sociální nebo zdravotní pojištění včas, vystavuje se riziku vzniku penále, pokut a v krajním případě i exekučnímu vymáhání dlužných částek. U sociálního pojištění může dojít ke zkrácení doby pojištění potřebné pro důchod. Proto je důležité mít přehled o svých povinnostech, platit odvody včas a v případě problémů komunikovat s příslušnými úřady."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Jak vám kalkulačka pomůže?"
            description="Naše kalkulačka sociálního a zdravotního pojištění pro OSVČ vám rychle a jednoduše spočítá, kolik musíte odvádět na jednotlivých odvodech i daních. Stačí zadat základní údaje o příjmech, výdajích a typu činnosti a ihned získáte přehled o svých povinnostech."
          />
          <InfoCard
            icon={<BiQuestionMark className="w-8 h-8" />}
            title="Změny v legislativě a jejich dopad"
            description="Legislativa týkající se sociálního a zdravotního pojištění i daní pro OSVČ se pravidelně mění. Nové zákony mohou ovlivnit výši minimálních záloh, podmínky pro vstup do paušálního režimu nebo možnosti uplatnění slev. Je proto důležité sledovat aktuální informace a včas reagovat na změny, abyste vždy odváděli správné částky a vyhnuli se případným nedoplatkům nebo pokutám."
          />
        </div>
      </SectionWrapper>

      <OneStringInputCta />
    </>
  );
}
