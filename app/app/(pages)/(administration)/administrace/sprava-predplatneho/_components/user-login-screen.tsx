"use client";

import LoadErrorState from "@/app/(pages)/(povinnosti)/[accessId]/_components/LoadErrorState";
import EmailLoginModal from "@/app/_components/molecules/email-login-modal";
import React from "react";

type Props = {};

export default function UserLoginScreen({}: Props) {
  const [loginModalIsOpen, setLoginModalIsOpen] = React.useState(true);
  return (
    <>
      <EmailLoginModal
        isOpen={loginModalIsOpen}
        onClose={() => setLoginModalIsOpen(false)}
        redirectUrl="/administrace/sprava-predplatneho"
      />
      <LoadErrorState
        title="Nejste přihlášený/a"
        message="Abyste mohli spravovat předplatné, musíte se nejprve přihlásit."
        buttonText="Přihlásit se"
        buttonOnClick={() => setLoginModalIsOpen(true)}
      />
    </>
  );
}
