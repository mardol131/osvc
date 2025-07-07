import React from "react";
import { BsSignpost2 } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineTextsms } from "react-icons/md";
import GoldButton from "../buttons/GoldButton";
import HeadingCenter from "../headings/HeadingCenter";

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
    <div className="grid grid-cols-[1fr_5fr] items-start last:col-span-2 md:col-span-1 col-span-2 bg-zinc-100 p-5 rounded-lg">
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
    <div
      id="benefits"
      className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20"
    >
      <div className="max-w-wrapper flex flex-col gap-10 items-center">
        <HeadingCenter
          subheading={benefitsData.header.subheading}
          heading={benefitsData.header.heading}
          text={benefitsData.header.text}
        />
        <div className="flex flex-col items-center gap-10">
          <h3 className="font-bebas text-center">
            {benefitsData.benefitsHeading}
          </h3>
          <div className="grid grid-cols-2 gap-5 max-w-200">
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
          <h4 className="font-bebas text-center">
            {benefitsData.audience.title}
          </h4>
          <ul className="flex flex-col gap-2 text-xl list-inside">
            {benefitsData.audience.points.map((item) => {
              return (
                <li className="" key={item}>
                  <p className="">- {item}</p>
                </li>
              );
            })}
          </ul>
          <GoldButton text={benefitsData.cta.buttonText} href="/" />
        </div>
      </div>
    </div>
  );
}
