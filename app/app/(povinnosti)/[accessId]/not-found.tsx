import LoadErrorState from "@/app/(povinnosti)/[accessId]/_components/LoadErrorState";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <LoadErrorState
      title="Něco se nepovedlo"
      message="Omlouváme se, chyba je na naší straně. Zkuste to prosím později."
    />
  );
}
