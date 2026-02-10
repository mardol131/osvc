"use client";

import React, { useEffect, useState } from "react";
import ModalLayout from "../modal-layout";
import {
  login,
  requestPasswordReset,
  resetPassword,
} from "@/app/_functions/backend";
import { useAuth } from "@/app/_context/auth-context";
import EmailPasswordLoginScreen from "./screens/email-password-login-screen";
import SetPasswordScreen from "./screens/set-password-screen";
import CreatePasswordRequestScreen from "./screens/create-password-request-screen";
import { useRouter, useSearchParams } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  redirectUrl: string;
  onClose: () => void;
  queryEmail?: string;
}

export default function LoginModal({
  isOpen,
  redirectUrl,
  onClose,
  queryEmail,
}: LoginModalProps) {
  // Screen state: 'email' | 'email-password' | 'set-password' | 'create-password-request'
  const searchParams = useSearchParams();
  const queryScreen = searchParams.get("loginModalScreen");
  const [screen, setScreen] = useState<
    "email-password" | "set-password" | "create-password-request"
  >(
    queryScreen === "email-password" ||
      queryScreen === "set-password" ||
      queryScreen === "create-password-request"
      ? (queryScreen as any)
      : "email-password",
  );

  const router = useRouter();
  const [createPasswordEmail, setCreatePasswordEmail] = useState("");
  const [isCreatePasswordLoading, setIsCreatePasswordLoading] = useState(false);
  const [isCreatePasswordSuccess, setIsCreatePasswordSuccess] = useState(false);
  const [createPasswordError, setCreatePasswordError] = useState("");

  const [email, setEmail] = useState(queryEmail || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    router.replace(redirectUrl);
  }, []);

  // Handler pro odeslání žádosti o vytvoření hesla
  const handleCreatePasswordRequestSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setCreatePasswordError("");
    if (!createPasswordEmail || !createPasswordEmail.includes("@")) {
      setCreatePasswordError("Zadejte prosím platný email");
      return;
    }
    setIsCreatePasswordLoading(true);

    try {
      const response = await requestPasswordReset({
        email: createPasswordEmail,
        redirectUrl,
      });
      if (response) {
        setIsCreatePasswordSuccess(true);
      }
    } catch (err) {
      setCreatePasswordError(
        "Chyba při odesílání žádosti. Zkuste to prosím znovu.",
      );
    } finally {
      setIsCreatePasswordLoading(false);
    }
  };

  const handleEmailPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Zadejte prosím platný email");
      return;
    }
    if (!password) {
      setError("Zadejte prosím heslo");
      return;
    }
    setIsLoading(true);
    try {
      await auth.login(email, password);
      router.refresh();
      handleClose();
    } catch (err) {
      setError("Chyba při přihlášení. Zkuste to prosím znovu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError("");
    if (!newPassword || newPassword.length < 8) {
      setError("Heslo musí mít alespoň 8 znaků");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Hesla se neshodují");
      return;
    }

    if (!searchParams.get("token")) {
      setError("Neplatný odkaz. Zkuste to prosím znovu.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await resetPassword({
        token: searchParams.get("token") || "",
        password: newPassword,
      });
    } catch (err) {
      setError("Chyba při nastavování hesla. Zkuste to prosím znovu.");
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsSuccess(false);
    setError("");
    setCreatePasswordEmail("");
    setIsCreatePasswordLoading(false);
    setIsCreatePasswordSuccess(false);
    setCreatePasswordError("");
    setScreen("email-password");
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={handleClose}
      title={
        screen === "email-password"
          ? "Přihlášení"
          : screen === "set-password"
            ? "Nastavení nového hesla"
            : "Vytvoření hesla"
      }
      description={
        screen === "email-password"
          ? "Přihlaste se pomocí emailu a hesla. Pokud ještě heslo nemáte, klikněte na tlačítko níže pro jeho vytvoření."
          : screen === "set-password"
            ? "Nastavte si nové heslo pro svůj účet."
            : "Pro vytvoření hesla zadejte svůj e-mail. Pošleme vám ověřovací odkaz pro nastavení nového hesla."
      }
      maxWidth="md"
    >
      {screen === "create-password-request" && (
        <CreatePasswordRequestScreen
          email={createPasswordEmail}
          setEmail={setCreatePasswordEmail}
          isLoading={isCreatePasswordLoading}
          isSuccess={isCreatePasswordSuccess}
          error={createPasswordError}
          onSubmit={handleCreatePasswordRequestSubmit}
          footer={{
            leftButton: {
              text: "Zpět na přihlášení",
              onClick: () => setScreen("email-password"),
            },
            rightButton: {
              text: "Zavřít",
              onClick: handleClose,
            },
          }}
          onClose={handleClose}
        />
      )}
      {screen === "email-password" && (
        <EmailPasswordLoginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          error={error}
          onSubmit={handleEmailPasswordSubmit}
          footer={{
            leftButton: {
              text: "První přihlášení? Vytvořit heslo",
              onClick: () => setScreen("create-password-request"),
            },
            rightButton: {
              text: "Zapomenuté heslo",
              onClick: () => setScreen("create-password-request"),
            },
          }}
        />
      )}
      {screen === "set-password" && (
        <SetPasswordScreen
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          isSuccess={isSuccess}
          error={error}
          onSubmit={handleSetPasswordSubmit}
          onClose={handleClose}
          footer={{
            leftButton: {
              text: "Zpět na přihlášení",
              onClick: () => setScreen("email-password"),
            },
            rightButton: {
              text: "Zavřít",
              onClick: handleClose,
            },
          }}
        />
      )}
    </ModalLayout>
  );
}
