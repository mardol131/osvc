"use client";

import React, { useState } from "react";
import { FaHandshake } from "react-icons/fa";

export default function CTA() {
  const [email, setEmail] = useState<string>("");
  const [responseOk, setResponseOk] = useState(false);

  async function handleSubmit() {
    console.log(email);
    const response = await fetch(
      "https://hook.eu2.make.com/5dmi6nvwyg988o4h03kp7xhathne1d67",
      {
        method: "POST",
        mode: "cors",

        body: JSON.stringify(email),
      }
    );
    console.log(response);

    if (response.ok) {
      setResponseOk(true);
    }
  }

  return (
    <div className="flex items-center justify-center md:px-10 px-4 md:py-30 py-20">
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
              <h4>Děkujeme!</h4>
              <h4>Vaše podpora je to, co nás drží na nohou.</h4>
            </div>
          ) : (
            <>
              <h4>
                Zanechte nám svůj email, abychom se Vám mohli ozvat s novinkami.
              </h4>
              <div className="flex md:flex-row flex-col md:gap-5 gap-4">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="emmail"
                  className="bg-white rounded-lg min-h-10 p-3 w-full text-primary font-oswald"
                />
                <button
                  type="submit"
                  className="cursor-pointer shrink-0 shadow-lg text-lg uppercase font-semibold p-3 bg-linear-150 from-secondary to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald"
                >
                  Přihlásit se k odběru
                </button>
              </div>
              <p>
                Nebudeme Vás otravovat žádnými reklamami. Odesílat budeme pouze
                informace týkající se novinek v naší službě.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
