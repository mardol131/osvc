import React from "react";
import Image, { StaticImageData } from "next/image";
import UniversalButton, { ButtonType } from "../buttons/UniversalButton";

type Props = {
  options: {
    image: {
      src: StaticImageData;
      alt: string;
      mobileVisibility?: "hidden";
      size?: "large" | "middle" | "small";
    };
    heading: string;
    subheading?: string;
    text?: string;
    buttons?: ButtonType[];
  };
};

export default function HeroWithImage({ options }: Props) {
  const { image, heading, subheading, buttons, text } = options;
  return (
    <>
      <div className=" w-full flex flex-col items-start gap-5 text-start max-w-200">
        <div className="flex flex-col items-start gap-3">
          <p className="font-semibold uppercase text-secondary">{subheading}</p>
          <h1>{heading}</h1>
        </div>
        <p className="md:text-2xl text-lg text-textP">{text}</p>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {buttons?.map((button) => {
            return (
              <UniversalButton
                key={button.options.text + button.options.color}
                {...button}
              />
            );
          })}
        </div>
      </div>
      <Image
        src={image.src}
        width={1000}
        height={1000}
        alt={image.alt}
        className={`max-w-90 justify-self-end md:block ${image.mobileVisibility}`}
      />
    </>
  );
}
