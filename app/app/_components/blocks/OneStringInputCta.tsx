"use client";

import React, { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import Button from "../atoms/Button";

type Props = {
  options: {
    heading: string;
    buttonText: string;
    subheading: string;
    inputType: "email" | "text";
    dataDestination: string;
    placeholder?: string;
  };
};

export default function OneStringInputCta({ options }: Props) {
  const [email, setEmail] = useState<string>("");
  const [responseOk, setResponseOk] = useState(false);

  async function handleSubmit() {
    try {
      const response = await fetch(options.dataDestination, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setResponseOk(true);
      }
    } catch {
      console.log("Something went wrong");
    }
  }

  return (
    <SectionWrapper>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="relative bg-gradient-to-br from-primary via-primary to-zinc-900 shadow-2xl w-full text-textLight md:p-12 p-8 rounded-2xl flex flex-col gap-6 text-center md:text-start overflow-hidden"
      >
        {/* Dekorativní gradient overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-tertiary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {responseOk ? (
          <div className="flex flex-col md:gap-6 gap-5 items-center w-full text-center py-4 relative z-10">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-full shadow-lg">
              <FaHandshake className="text-5xl text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-secondary">Děkujeme za podporu!</h3>
              <p className="text-lg text-zinc-300">
                Brzy se Vám ozveme s novinkami
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="mb-6">
              <h3 className="mb-3">{options.heading}</h3>
              <p className="text-zinc-300 text-lg">{options.subheading}</p>
            </div>
            <div className="flex md:flex-row flex-col md:gap-4 gap-4">
              <input
                placeholder={options.placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type={options.inputType}
                className="bg-white/95 backdrop-blur-sm rounded-xl min-h-14 px-5 w-full text-primary font-oswald text-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all shadow-md"
              />
              <Button
                className="md:text-nowrap"
                text={options.buttonText}
                htmlType="submit"
                size="md"
              />
            </div>
          </div>
        )}
      </form>
    </SectionWrapper>
  );
}
