import React from "react";
import BlackButton from "../buttons/BlackButton";
import GoldButton from "../buttons/GoldButton";
import Image, { StaticImageData } from "next/image";
import Wrapper from "../wrapper/Wrapper";
import UniversalButton, { ButtonType } from "../buttons/UniversalButton";

type Props = {
  options: {
    image: {
      src: StaticImageData;
      alt: string;
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
    <Wrapper classNameTwo={"grid grid-cols-2 items-center"} classNameOne={""}>
      <div className=" w-full flex flex-col items-start gap-5 text-start max-w-200">
        <div className="flex flex-col items-center">
          <h1>{heading}</h1>
        </div>
        <p className="md:text-2xl text-lg text-textP">{text}</p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          {buttons?.map((button) => {
            return (
              <UniversalButton key={button.text + button.type} {...button} />
            );
          })}
        </div>
      </div>
      <Image
        src={image.src}
        width={1000}
        height={1000}
        alt={image.alt}
        className={`max-w-100 justify-self-end`}
      />
    </Wrapper>
  );
}
