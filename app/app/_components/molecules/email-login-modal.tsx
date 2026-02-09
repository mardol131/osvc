"use client";

import React, { useState } from "react";
import ModalLayout from "./modal-layout";
import Button from "@/app/_components/atoms/Button";
import { login } from "@/app/_functions/backend";

interface EmailLoginModalProps {
  isOpen: boolean;
  redirectUrl: string;
  onClose: () => void;
  onSubmit?: (email: string) => void | Promise<void>;
  title?: string;
  description?: string;
  queryEmail?: string;
}

export default function EmailLoginModal({
  isOpen,
  redirectUrl,
  onClose,
  onSubmit,
  queryEmail,
  title = "Přihlášení pomocí emailu",
  description = "Abyste mohli pokračovat, musíme se nejprve ověřit. Na zadanou emailovou adresu Vám zašleme přihlašovací odkaz, který Vám umožní pokračovat dál.",
}: EmailLoginModalProps) {
  const [email, setEmail] = useState(queryEmail || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Základní validace emailu
    if (!email || !email.includes("@")) {
      setError("Zadejte prosím platný email");
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(email);
      }

      const res = await login(email, redirectUrl);

      if (res.success) {
        setIsSuccess(true);
      }

      setEmail("");
    } catch (err) {
      setError("Chyba při odesílání emailu. Zkuste to prosím znovu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setIsSuccess(false);
    setError("");
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Popis */}
        {description && (
          <p className="text-zinc-600 text-lg leading-relaxed">{description}</p>
        )}

        {!isSuccess && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-md font-medium text-zinc-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.com"
              className="px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-zinc-900 placeholder:text-zinc-400"
              disabled={isLoading}
              required
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit button */}

        {isSuccess ? (
          <Button
            htmlType="button"
            onClick={handleClose}
            text="Email s přihlašovacím odkazem byl odeslán. Okno můžete nyní zavřít."
            variant="gold"
            size="md"
            loading={isLoading}
            className="w-full"
          />
        ) : (
          <Button
            htmlType="submit"
            text={isLoading ? "Odesílám..." : "Odeslat přihlašovací email"}
            variant="gold"
            size="md"
            disabled={isLoading || !email}
            loading={isLoading}
            className="w-full"
          />
        )}
      </form>
    </ModalLayout>
  );
}
