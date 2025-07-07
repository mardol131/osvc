"use client";

import React, { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState<string>("");

  async function handleSubmit() {
    console.log(email);
    const response = await fetch(
      "https://webhook-test.com/f64f80d62398bb08229d688d9c4119c1",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    console.log(response);
  }

  return (
    <div className="flex items-center justify-center md:px-10 px-4 md:py-30 py-20">
      <div className="max-w-wrapper w-full">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-primary w-full text-textLight p-10 rounded-lg flex flex-col gap-4 text-center md:text-start"
        >
          <h4>Zanechte nám svůj email, můžeme se Vám ozvat později.</h4>
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
              className="cursor-pointer shrink-0 shadow-lg text-lg uppercase font-semibold p-3 bg-linear-150 from-tertiary to-colorTo hover:scale-105 transition-all ease-in-out text-textLight rounded-lg font-oswald"
            >
              Přihlásit se k doběru
            </button>
          </div>
          <p>
            Nebudeme Vás otravovat žádnými reklamami. Odesílat budeme pouze
            informace týkající se novinek v naší službě.
          </p>
        </form>
      </div>
    </div>
  );
}
