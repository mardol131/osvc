import { servicePrice } from "@/app/_data/pricing";
import { FaCheckCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Button from "../atoms/Button";
import SectionWrapper from "../blocks/SectionWrapper";
import HeadingCenter from "../blocks/headings/HeadingCenter";

type Props = {};

function CostItem({
  label,
  value,
  negative,
  positive,
}: {
  label: string;
  value: string;
  negative?: boolean;
  positive?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-3 py-3 border-b border-zinc-100 last:border-0">
      <div className="flex items-center gap-2 flex-1">
        {negative && (
          <FiX className="flex-shrink-0 text-zinc-400 text-xl mt-0.5" />
        )}
        {positive && (
          <FaCheckCircle className="flex-shrink-0 text-green-600 text-xl mt-0.5" />
        )}
        <span className="text-textP leading-relaxed">{label}</span>
      </div>
      <span
        className={`font-semibold flex-shrink-0 ${
          negative
            ? "text-zinc-600"
            : positive
            ? "text-green-600"
            : "text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Comparison({}: Props) {
  return (
    <div className="relative pt-10">
      <SectionWrapper
        levelTwo={{
          className: "items-center relative overflow-hidden",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <HeadingCenter
            subheading="Matematika je jednoduchá"
            heading="Proč to dává smysl."
            text="Podívejme se na to z praktického hlediska. Co získáte a kolik vás to bude stát?"
          />

          {/* Porovnání nákladů */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 max-w-5xl mx-auto w-full">
            {/* Bez služby */}
            <div className="group relative bg-white p-8 rounded-xl border-2 border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <h3 className="text-primary text-center">Bez naší služby</h3>
                </div>
                <div className="space-y-2">
                  <CostItem
                    label="Pokuty"
                    value="až desítky tisíc Kč"
                    negative
                  />
                  <CostItem
                    label="Hledání informací (2h × 400 Kč/h)"
                    value="800 Kč"
                    negative
                  />
                  <CostItem
                    label="Stres a nejistota"
                    value="Nelze vyyčíslit"
                    negative
                  />
                  <div className="border-t-2 border-zinc-200 pt-4 mt-6">
                    <div className="flex justify-between items-end">
                      <span className="font-semibold text-lg text-primary">
                        Náklady:
                      </span>
                      <span className="text-2xl font-semibold text-zinc-700">
                        od 800 Kč
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Se službou */}
            <div className="group relative bg-gradient-to-br from-secondary/10 via-white to-tertiary/10 p-8 rounded-xl border-2 border-secondary/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <h3 className="text-primary text-center">S naší službou</h3>
                </div>
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

                  <div className="border-t-2 border-secondary/30 pt-4 mt-6">
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-bold text-lg text-primary">
                        Celkem:
                      </span>
                      <span className="text-2xl font-bold text-secondary">
                        {servicePrice} Kč/rok
                      </span>
                    </div>
                    <Button
                      text="Koupit předplatné"
                      className="justify-self-stretch"
                      href={"/koupit-predplatne"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI kalkulačka */}
          <div className="relative bg-gradient-to-br mb-20 from-primary via-zinc-800 to-zinc-900 p-8 md:p-10 rounded-2xl shadow-2xl border border-secondary/20 max-w-3xl mx-auto w-full overflow-hidden">
            {/* Dekorativní pozadí */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h4 className="text-textLight mb-4 text-center font-bebas">
                Vrátí se to i kdyby se nic nestalo
              </h4>
              <p className="text-zinc-200 text-lg text-center mb-8 leading-relaxed">
                Pokud vám služba pomůže{" "}
                <span className="text-secondary">vyhnout se jediné pokutě</span>{" "}
                nebo ušetří jen{" "}
                <span className="text-secondary">1 hodinu vašeho času</span>, už
                se vám zaplatí!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl font-semibold text-secondary mb-3">
                    1×
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    Vyhnete se jedné pokutě a jste v plusu
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl font-semibold text-secondary mb-3">
                    1 hod.
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    Ušetřený čas hledáním to zaplatí okamžitě
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-5xl font-semibold text-secondary mb-3">
                    ∞
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    Klid a jistota po celý rok
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
