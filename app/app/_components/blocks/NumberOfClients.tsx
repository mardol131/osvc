import React from "react";

type Props = {};

export default function NumberOfClients({}: Props) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-zinc-200 md:mt-4 mt-2">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-tertiary border-2 border-white"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tertiary to-secondary border-2 border-white"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/70 to-tertiary/70 border-2 border-white"></div>
      </div>
      <p className="text-primary font-semibold">
        <span className="text-secondary font-semibold">153+</span> lidí již
        projevilo zájem
      </p>
    </div>
  );
}
