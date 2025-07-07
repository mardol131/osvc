import React from "react";
import { BsSignpost2 } from "react-icons/bs";
import { FaHourglass, FaRegCalendarAlt } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineTextsms } from "react-icons/md";

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
  return (
    <div className="grid grid-cols-[1fr_5fr] items-start ">
      <div className="px-3 py-1 text-4xl">
        {icon === "email" && <MdOutlineEmail />}
        {icon === "sms" && <MdOutlineTextsms />}
        {icon === "upozorneni" && <FiAlertTriangle />}
        {icon === "navody" && <GoChecklist />}
        {icon === "linky" && <BsSignpost2 />}
        {icon === "calendar" && <IoCalendarOutline />}
      </div>
      <div>
        <p className="font-semibold text-xl">{header}</p>
        <p className="text-textP text-lg">{text}</p>
      </div>
    </div>
  );
}

export default function Benefits({ benefitsData }: Props) {
  return (
    <div className=" flex items-center justify-center px-10 py-30">
      <div className="max-w-wrapper flex flex-col gap-10 items-center">
        <div className="flex flex-col items-center gap-3 max-w-200 text-center">
          <p className="text-secondary font-bold uppercase">
            {benefitsData.header.subheading}
          </p>
          <h2 className="">{benefitsData.header.heading}</h2>
          <p className="text-lg text-textP">{benefitsData.header.text}</p>
        </div>
        <div className="flex flex-col items-center gap-10">
          <h3 className="font-bebas">{benefitsData.benefitsHeading}</h3>
          <div className="grid grid-cols-2 gap-10 max-w-200">
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
        <div className="flex flex-col items-center gap-10">
          <h4 className="font-bebas">{benefitsData.audience.title}</h4>
          <ul className="list-disc text-xl">
            {benefitsData.audience.points.map((item) => {
              return (
                <li key={item}>
                  <p className="">{item}</p>
                </li>
              );
            })}
          </ul>
          <a
            href="/"
            className="shadow-lg text-2xl uppercase font-semibold py-4 px-5 bg-linear-200 from-tertiary to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald flex items-center justify-center"
          >
            {benefitsData.cta.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
