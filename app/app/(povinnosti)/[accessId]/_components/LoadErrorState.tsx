"use client";

import React from "react";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import Button from "@/app/_components/atoms/Button";
import { FiAlertCircle } from "react-icons/fi";

type Props = {
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function LoadErrorState({
  title,
  message,
  buttonText,
  buttonLink,
}: Props) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white flex items-start justify-center">
      <SectionWrapper levelTwo={{ className: "items-center" }}>
        <div className="max-w-md mx-auto text-center">
          {/* Text */}
          <h2 className="text-primary mb-3">{title}</h2>
          <p className="text-textP text-base md:text-lg leading-relaxed mb-8">
            {message}
          </p>

          {/* Tlačítko */}
          <div className="flex justify-center">
            <Button
              href={buttonLink}
              text={buttonText || "Načíst znovu"}
              onClick={buttonLink ? undefined : handleReload}
              variant="gold"
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
