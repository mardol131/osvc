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
  // Screen state: 'email' | 'login-screen' | 'set-password' | 'create-password-request'
  const searchParams = useSearchParams();
  const queryScreen = searchParams.get("loginModalScreen");
  const [screen, setScreen] = useState<
    "login-screen" | "set-password" | "create-password-request"
  >(
    queryScreen === "login-screen" ||
      queryScreen === "set-password" ||
      queryScreen === "create-password-request"
      ? (queryScreen as any)
      : "login-screen",
  );

  const [token] = useState(searchParams.get("token") || "");
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

    const response = await auth.requestPasswordResetEmail(
      createPasswordEmail,
      redirectUrl,
    );
    if (response.message === "success") {
      setIsCreatePasswordLoading(false);
      setIsCreatePasswordSuccess(true);
    } else {
      setIsCreatePasswordLoading(false);
      setCreatePasswordError(
        "Chyba při odesílání emailu. Zkuste to prosím znovu.",
      );
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const response = await auth.login(email, password);
    if (response.message === "email-missing") {
      setError("Zadejte email");
      setIsLoading(false);
    } else if (response.message === "password-missing") {
      setError("Zadejte heslo");
      setIsLoading(false);
    } else if (response.message === "no-match") {
      setError("Neplatný email nebo heslo");
      setIsLoading(false);
      return;
    } else if (response.message === "error") {
      setError("Chyba při přihlášení. Zkuste to prosím znovu.");
      setIsLoading(false);
      return;
    } else if (response.message === "success") {
      setIsLoading(false);
      onClose();
      router.refresh();
    }
  };

  const handlePasswordResetSubmit = async (
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

    if (!token) {
      setError("Neplatný odkaz. Zkuste to prosím znovu.");
      return;
    }
    setIsLoading(true);
    const res = await auth.resetPassword(token, newPassword);
    if (res.message === "success") {
      setIsLoading(false);
      setIsSuccess(true);
    } else {
      setIsLoading(false);
      setError("Chyba při nastavování hesla. Zkuste to prosím znovu.");
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
    setScreen("login-screen");
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={handleClose}
      title={
        screen === "login-screen"
          ? "Přihlášení"
          : screen === "set-password"
            ? "Nastavení nového hesla"
            : "Vytvoření hesla"
      }
      description={
        screen === "login-screen"
          ? "Přihlaste se pomocí emailu a hesla."
          : screen === "set-password"
            ? "Nastavte si nové heslo pro svůj účet."
            : "Pro vytvoření hesla zadejte svůj e-mail. Pošleme vám ověřovací odkaz pro nastavení nového hesla."
      }
      component={
        screen === "login-screen" && (
          <div>
            <p>
              <span className="font-semibold">První přihlášení</span> - Pro
              první přihlášení je potřeba vytvořit nové heslo. Klikněte na
              tlačítko "První přihlášení" v levém dolním rohu.
            </p>
          </div>
        )
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
              onClick: () => setScreen("login-screen"),
            },
            rightButton: {
              text: "Zavřít",
              onClick: handleClose,
            },
          }}
          onClose={handleClose}
        />
      )}
      {screen === "login-screen" && (
        <EmailPasswordLoginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          error={error}
          onSubmit={handleLogin}
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
          onSubmit={handlePasswordResetSubmit}
          onClose={handleClose}
          footer={{
            leftButton: {
              text: "Zpět na přihlášení",
              onClick: () => setScreen("login-screen"),
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
