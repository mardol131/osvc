import LoadErrorState from "@/app/(pages)/(access)/[accessId]/_components/LoadErrorState";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <LoadErrorState
      title="Přístup neexistuje"
      message="Omlouváme se, chyba je na naší straně. Zkuste to prosím později."
    />
  );
}
