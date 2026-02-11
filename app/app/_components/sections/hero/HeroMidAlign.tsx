import React from "react";

type Props = {
  options: {
    heading: string;
    headingColor?: "secondary";
    secondHeading?: string;
    text: string;
    socialProof?: React.ReactNode;
    buttonsColumns: 1 | 2 | 3;
    buttons?: React.ReactNode;
    label?: string;
  };
};

export default function HeroMidAlign({ options }: Props) {
  return (
    <div className="relative flex items-center justify-center md:px-10 px-4 md:py-30 py-20 overflow-hidden">
      {/* Dekorativní pozadí */}

      <div className="relative z-10 w-full flex flex-col items-center gap-6 text-center max-w-200 mx-auto">
        {/* Badge */}
        {options.label && (
          <p className="text-base font-semibold text-secondary uppercase  ">
            {options.label}
          </p>
        )}
        {/* Hlavní nadpis */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="bg-linear-to-br from-primary via-primary to-zinc-700 bg-clip-text pt-2 text-transparent">
            {options.heading}
            <br />
            {options.secondHeading && <>{options.secondHeading}</>}
          </h1>
        </div>

        {/* Popisek */}
        <p className="md:text-2xl text-lg text-textP max-w-4xl leading-relaxed">
          {options.text}
        </p>

        {/* CTA tlačítka */}
        {options.buttons && (
          <>
            {options.buttonsColumns === 1 && (
              <div className="grid gap-4 mt-8 w-full max-w-md">
                {options.buttons}
              </div>
            )}
            {options.buttonsColumns === 2 && (
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-8 w-full max-w-2xl">
                {options.buttons}
              </div>
            )}
            {options.buttonsColumns === 3 && (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8 w-full max-w-4xl">
                {options.buttons}
              </div>
            )}
          </>
        )}

        {/* Social proof */}
        {options.socialProof && (
          <div className="mt-2">{options.socialProof}</div>
        )}
      </div>
    </div>
  );
}
