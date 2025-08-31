"use client";

import React, { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { ButtonType } from "../buttons/UniversalButton";

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
  const [data, setData] = useState<string>("");
  const [responseOk, setResponseOk] = useState(false);

  async function handleSubmit() {
    const response = await fetch(options.dataDestination, {
      method: "POST",
      mode: "cors",

      body: JSON.stringify(data),
    });

    if (response.ok) {
      setResponseOk(true);
    }
  }

  return (
    <div className="flex items-center justify-center justify-self-stretch">
      <div className="max-w-wrapper w-full">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-primary shadow-lg w-full text-textLight p-10 rounded-lg flex flex-col gap-4 text-center md:text-start"
        >
          {responseOk ? (
            <div className="flex flex-col md:gap-5 gap-4 items-center w-full text-center">
              <FaHandshake className="text-4xl text-emerald-500" />
              <h4>Děkujeme za podporu!</h4>
            </div>
          ) : (
            <>
              <h4>{options.heading}</h4>
              <div className="flex md:flex-row flex-col md:gap-5 gap-4">
                <input
                  placeholder={options.placeholder}
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                  type={options.inputType}
                  className="bg-white rounded-lg min-h-10 p-3 w-full text-primary font-oswald"
                />
                <button
                  type="submit"
                  className="cursor-pointer shrink-0 shadow-lg text-lg uppercase font-semibold p-3 bg-linear-150 from-secondary to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald"
                >
                  {options.buttonText}
                </button>
              </div>
              <p>{options.subheading}</p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
