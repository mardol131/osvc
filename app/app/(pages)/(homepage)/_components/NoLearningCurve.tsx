import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import FeatureCard from "@/app/_components/blocks/feature-card";
import { Zap, RefreshCw, Shield } from "lucide-react";

export default function NoLearningCurve() {
  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bebas mb-4">
            Bez zbytečné složitosti
          </h2>
          <p className="text-lg text-textP">
            Nemusíte se s ničím učit. Vše funguje automaticky podle vašich
            preferencí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-secondary" strokeWidth={1.5} />}
            title="Plně automatické"
            text="Nastavte si jednou a poté už nemusíte řešit nic. Vše už zařídíme my. SMS upozornění na blížící se termíny, měsíční přehledy změn v legislativě a automatické varování před novými povinnostmi."
          />
          <FeatureCard
            icon={
              <RefreshCw className="w-8 h-8 text-secondary" strokeWidth={1.5} />
            }
            title="Žádný nový systém"
            text="Nemusíte se s ničím učit ani instalovat speciální aplikace. Informace dostáváte jednoduše přes email a SMS, stejně jako kteroukoliv jinou zprávu. Vše je čitelné, bez zbytečné úřední mluvy. Jen jasné a přehledné informace."
          />
          <FeatureCard
            icon={
              <Shield className="w-8 h-8 text-secondary" strokeWidth={1.5} />
            }
            title="Vždy aktuální"
            text="Zákony se neustále mění a běžný podnikatel rozhodně nemá čas na jejich sledování. To si vezmeme na starost za vás. Sledujeme změny v daňové legislativě, nové povinnosti OSVČ a další starosti."
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
