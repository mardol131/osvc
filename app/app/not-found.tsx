import LoadErrorState from "@/app/(pages)/(access)/[accessId]/_components/LoadErrorState";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <LoadErrorState
      title="Stránku se nepodařilo najít"
      message="Kliknutím na tlačítko níže se vrátíte na hlavní stránku."
      buttonText="Zpět na hlavní stránku"
      buttonLink="/"
    />
  );
}
