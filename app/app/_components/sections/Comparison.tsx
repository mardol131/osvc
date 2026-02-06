import { servicePrice } from "@/app/_data/pricing";
import { AlertCircle, Clock, TrendingUp } from "lucide-react";
import Button from "../atoms/Button";
import SectionWrapper from "../blocks/SectionWrapper";
import HeadingCenter from "../blocks/headings/HeadingCenter";
import RoiCard from "../blocks/roi-card";
import ComparisonCard from "../blocks/comparison-card";
import CostItem from "../blocks/cost-item";

type Props = {};

export default function Comparison({}: Props) {
  return (
    <div className="relative py-10">
      <SectionWrapper
        levelTwo={{
          className: "items-center relative overflow-hidden",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <HeadingCenter
            subheading="Matematika je jednoduchá"
            heading="Proč to dává baseysl."
            text="Podívejme se na to z praktického hlediska. Co získáte a kolik vás to bude stát?"
          />

          {/* Porovnání nákladů */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-4xl mx-auto w-full">
            {/* Bez služby */}
            <ComparisonCard title="Bez naší služby">
              <div className="space-y-2">
                <CostItem label="Pokuty" value="až desítky tisíc Kč" negative />
                <CostItem
                  label="Hledání informací (2h × 400 Kč/h)"
                  value="800 Kč"
                  negative
                />
                <CostItem
                  label="Stres a nejistota"
                  value="Nelze vyčíslit"
                  negative
                />
                <div className="border-t border-zinc-200 pt-4 mt-6">
                  <div className="space-y-1">
                    <p className="text-textP text-base">Celkové náklady:</p>
                    <p className="text-3xl font-bebas text-primary">
                      od 800 Kč
                    </p>
                  </div>
                </div>
              </div>
            </ComparisonCard>

            {/* Se službou */}
            <ComparisonCard title="S naší službou" gradient>
              <div className="space-y-2">
                <CostItem
                  label="Roční členství"
                  value={`${servicePrice} Kč`}
                  positive
                />
                <CostItem
                  label="Automatické upozornění na termíny"
                  value="Zahrnuto"
                  positive
                />
                <CostItem
                  label="Měsíční přehledy změn"
                  value="Zahrnuto"
                  positive
                />

                <div className="border-t border-secondary/30 pt-4 mt-6">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-textP text-base">Celkové náklady:</p>
                      <p className="text-3xl font-bebas text-secondary">
                        {servicePrice} Kč/rok
                      </p>
                    </div>
                    <Button
                      text="Koupit předplatné"
                      className="w-full justify-center"
                      href={"/koupit-predplatne"}
                    />
                  </div>
                </div>
              </div>
            </ComparisonCard>
          </div>

          {/* ROI scénáře */}
          <div className="max-w-4xl mx-auto w-full mt-12">
            <div className="text-center mb-8">
              <h4 className="text-primary mb-2">
                Investice do služby se vrátí tak jako tak
              </h4>
              <p className="text-textP">
                Realistické scénáře, jak si služba zaplatí sama
              </p>
            </div>

            <div className="grid grid-cols-1 mb-10 md:grid-cols-3 gap-6">
              <RoiCard
                icon={<AlertCircle className="w-6 h-6" />}
                header="Pokuta, které se vyhnete"
                text="Stačí se vyhnout jedné pokutě a služba se zaplatí, někdy i mnohonásobně."
                value="Klidně i 10 000 Kč"
                valueLabel="pokuta za zmeškanou povinnost"
              />
              <RoiCard
                icon={<Clock className="w-6 h-6" />}
                header="Čas jsou peníze"
                text="Nemusíte hledat v nepřehledných webech, řešit novinky v zákonech nebo se bát, že na něco zapomenete."
                value="od 5 hod x 400 Kč"
                valueLabel="úspora času"
              />
              <RoiCard
                icon={<TrendingUp className="w-6 h-6" />}
                header="Klid na podnikání"
                text="Ani kdybyste nás nepotřebovali, je to cena jistoty, že vše máte pod kontrolou a nic nezmeškaíte."
                value={`Nevyčíslitelné`}
                valueLabel="klid po celý rok"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
