import LoadErrorState from "@/app/(povinnosti)/[accessId]/_components/LoadErrorState";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <LoadErrorState
      title="V tuto chvíli není možné předplatné koupit."
      message="Omlouváme se, v tuto chvíli probíhá údržba webu. Vraťte se prosím později."
      buttonText="Zpět na hlavní stránku"
      buttonLink="/"
    />
  );
}
