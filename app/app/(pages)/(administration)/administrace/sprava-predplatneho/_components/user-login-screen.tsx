"use client";

import LoadErrorState from "@/app/(pages)/(access)/[accessId]/_components/LoadErrorState";
import LoginModal from "@/app/_components/molecules/login-modal/login-modal";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  queryEmail?: string;
};

export default function UserLoginScreen({ queryEmail }: Props) {
  const searchParams = useSearchParams();
  const [loginModalIsOpen, setLoginModalIsOpen] = React.useState(false);
  useEffect(() => {
    const openModal = searchParams.get("openLoginModal") === "true";

    setLoginModalIsOpen(openModal);
  }, []);
  return (
    <>
      <LoginModal
        queryEmail={queryEmail}
        isOpen={loginModalIsOpen}
        onClose={() => setLoginModalIsOpen(false)}
        redirectUrl={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/administrace/sprava-predplatneho`}
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
