"use client";

import React from "react";
import SectionWrapper from "@/app/_components/blocks/SectionWrapper";
import Button from "@/app/_components/atoms/Button";
import { FiAlertCircle } from "react-icons/fi";

type Props = {
  title: string;
  message: string;
};

export default function LoadErrorState({ title, message }: Props) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white flex items-center justify-center">
      <SectionWrapper levelTwo={{ className: "items-center" }}>
        <div className="max-w-md mx-auto text-center">
          {/* Ikona */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <FiAlertCircle className="text-secondary text-4xl" />
            </div>
          </div>

          {/* Text */}
          <h2 className="text-primary mb-3">{title}</h2>
          <p className="text-textP text-base md:text-lg leading-relaxed mb-8">
            {message}
          </p>

          {/* Tlačítko */}
          <div className="flex justify-center">
            <Button
              text="Načíst informace"
              onClick={handleReload}
              variant="gold"
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
