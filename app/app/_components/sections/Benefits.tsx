import React from "react";
import { BsSignpost2 } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineTextsms } from "react-icons/md";
import Button from "../atoms/Button";
import HeadingCenter from "../blocks/headings/HeadingCenter";
import SectionWrapper from "../blocks/SectionWrapper";

type Props = {
  benefitsData: {
    header: {
      heading: string;
      subheading: string;
      text: string;
    };
    benefitsHeading: string;
    benefits: {
      icon: string;
      title: string;
      text: string;
    }[];
    audience: {
      title: string;
      points: string[];
    };
    cta: {
      buttonText: string;
    };
  };
};

function BenefitCard({
  header,
  text,
  icon,
}: {
  header: string;
  text: string;
  icon: string;
}) {
  const getIcon = () => {
    const iconClass = "text-4xl";
    if (icon === "email") return <MdOutlineEmail className={iconClass} />;
    if (icon === "sms") return <MdOutlineTextsms className={iconClass} />;
    if (icon === "upozorneni") return <FiAlertTriangle className={iconClass} />;
    if (icon === "navody") return <GoChecklist className={iconClass} />;
    if (icon === "linky") return <BsSignpost2 className={iconClass} />;
    if (icon === "calendar") return <IoCalendarOutline className={iconClass} />;
    return null;
  };

  return (
    <div className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-zinc-200 hover:border-secondary/30 overflow-hidden">
      {/* Dekorativní gradient při hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h5 className=" text-primary mb-2 group-hover:text-secondary transition-colors break-words">
            {header}
          </h5>
          <p className="text-textP text-base leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function Benefits({ benefitsData }: Props) {
  return (
    <div id="benefitsSection" className="relative py-10">
      <SectionWrapper
        levelTwo={{ className: "items-center relative overflow-hidden" }}
      >
        {/* Dekorativní pozadí */}

        <div className="relative flex flex-col items-center z-10">
          <HeadingCenter
            subheading={benefitsData.header.subheading}
            heading={benefitsData.header.heading}
            text={benefitsData.header.text}
          />

          {/* Co dostanete */}
          <div className="flex flex-col items-center gap-8 my-16">
            <div className="text-center max-w-4xl">
              <h3 className="font-bebas mb-2 break-words">
                {benefitsData.benefitsHeading}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-5xl w-full">
              {benefitsData.benefits.map((item) => {
                return (
                  <BenefitCard
                    key={item.text}
                    text={item.text}
                    header={item.title}
                    icon={item.icon}
                  />
                );
              })}
            </div>
          </div>

          {/* Pro koho je služba */}
          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary via-zinc-800 to-zinc-900 rounded-2xl p-8 md:p-10 w-full shadow-2xl border border-secondary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <h4 className="font-bebas text-center text-textLight mb-6">
                  {benefitsData.audience.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {benefitsData.audience.points.map((item) => {
                    return (
                      <li className="flex items-start gap-3" key={item}>
                        <span className="text-secondary text-2xl flex-shrink-0 mt-1">
                          ✓
                        </span>
                        <p className="text-zinc-200 text-lg leading-relaxed">
                          {item}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <Button
              text={benefitsData.cta.buttonText}
              href={process.env.NEXT_PUBLIC_PAYMENT_LINK}
              target="_blank"
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
