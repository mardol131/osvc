import React from "react";
import { BsLightning } from "react-icons/bs";
import { FiClock, FiShield } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import SectionWrapper from "../blocks/SectionWrapper";
import HeadingCenter from "../blocks/headings/HeadingCenter";

type Props = {};

function ReasonCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-zinc-200 hover:border-secondary/30 overflow-hidden">
      {/* Dekorativní gradient při hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-xl flex items-center justify-center text-secondary text-3xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-primary mb-2 group-hover:text-secondary transition-colors break-words">
            {title}
          </h5>
          <p className="text-textP text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Reasons({}: Props) {
  return (
    <div className="relative py-10">
      <SectionWrapper
        levelTwo={{
          className: "items-center relative overflow-hidden",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <HeadingCenter
            subheading="Ještě více důvodů"
            heading="Proč si zvolit právě nás?"
            text="Kromě ekonomických důvodů existuje řada dalších výhod, které oceníte."
          />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto w-full">
            <ReasonCard
              icon={<BsLightning />}
              title="Okamžitý start"
              description="Po zakoupení získáte okamžitý přístup ke všem funkcím. Žádné čekání, žádné komplikace."
            />
            <ReasonCard
              icon={<GoChecklist />}
              title="Lidský jazyk"
              description="Zapomeňte na složitou úřední mluvu. Vše vysvětlujeme jasně a srozumitelně."
            />
            <ReasonCard
              icon={<FiShield />}
              title="Spolehlivost"
              description="Monitorujeme zákony a změny non-stop. Vy se o nic nemusíte starat."
            />
            <ReasonCard
              icon={<FiClock />}
              title="Úspora času"
              description="Nemusíte trávit hodiny na úředních stránkách. Vše důležité dostanete od nás."
            />
          </div>

          {/* Social proof */}
          <div className="relative bg-white p-8 rounded-xl shadow-lg border border-zinc-200 max-w-3xl mx-auto w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-secondary to-tertiary rounded-full flex items-center justify-center text-white text-3xl">
              "
            </div>
            <p className="text-lg text-textP italic text-center mb-4 mt-4">
              Konečně mám klid a vím, že na nic nezapomenu. Služba se mi vrátila
              hned první měsíc, když mi připomněla termín, na který bych určitě
              zapomněl.
            </p>
            <p className="text-center text-secondary font-semibold">
              – Jan, OSVČ v IT
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
