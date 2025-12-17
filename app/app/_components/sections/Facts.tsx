import React from "react";
import SectionWrapper from "../blocks/SectionWrapper";
import HeadingLeft from "../blocks/headings/HeadingLeft";
import { FiAlertTriangle, FiClock, FiShield } from "react-icons/fi";

type Props = {};

function ProblemCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-zinc-200 hover:shadow-lg transition-shadow">
      <div className="text-4xl text-secondary mb-4">{icon}</div>
      <h4 className="text-primary mb-3">{title}</h4>
      <p className="text-textP leading-relaxed">{description}</p>
    </div>
  );
}

export default function Facts({}: Props) {
  return (
    <SectionWrapper
      levelTwo={{
        className: "md:p-10 p-5 rounded-2xl bg-zinc-50",
      }}
    >
      <div className="flex flex-col gap-8">
        <HeadingLeft
          heading="Každá zapomenutá povinnost má svou cenu."
          subheading="Realita podnikání"
          text="Provozujete živnost a kromě práce samotné musíte myslet na desítky úředních termínů. Daňové přiznání, přehledy na zdravotní pojišťovnu, oznámení změn... Je to hodně a zapomenout je snadné."
        />

        {/* Příklady problémů */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <ProblemCard
            icon={<FiAlertTriangle />}
            title="Zapomenuté termíny = pokuty"
            description="Zmeškaný termín pro daňové přiznání může znamenat pokutu až 300 000 Kč. Stačí zapomenout a problém je na světě."
          />
          <ProblemCard
            icon={<FiClock />}
            title="Ztráta času hledáním"
            description="Kolik hodin ročně strávíte hledáním informací na úředních stránkách? Čas, který byste mohli věnovat zákazníkům."
          />
          <ProblemCard
            icon={<FiShield />}
            title="Stres z nejistoty"
            description="Konstaktní otázka: 'Nezapomněl jsem na něco důležitého?' Stres, který nemusíte mít."
          />
        </div>

        {/* Statistika */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-zinc-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-primary mb-4">
                Věděli jste, že průměrná pokuta za opožděné daňové přiznání je 2
                500 Kč?
              </h3>
              <p className="text-textP text-lg leading-relaxed">
                To je téměř{" "}
                <strong className="text-secondary">
                  7× více než roční členství
                </strong>{" "}
                u naší služby. Stačí jednou zapomenout a jednorázová pokuta vás
                přijde na mnohem více peněz.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="text-6xl font-bold text-secondary mb-2">
                2 500 Kč
              </div>
              <p className="text-sm text-textP uppercase">Průměrná pokuta</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
