import React from "react";
import Button from "@/app/_components/atoms/Button";
import LoginModalFooterButton from "./login-modal-footer-button";

interface CreatePasswordRequestScreenProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footer: {
    leftButton: {
      text: string;
      onClick: () => void;
    };
    rightButton: {
      text: string;
      onClick: () => void;
    };
  };
  onClose: () => void;
}

const CreatePasswordRequestScreen: React.FC<
  CreatePasswordRequestScreenProps
> = ({
  email,
  setEmail,
  isLoading,
  isSuccess,
  error,
  onSubmit,
  footer,
  onClose,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-6">
    {!isSuccess && (
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email-create-password"
          className="text-md font-medium text-zinc-700"
        >
          E-mail
        </label>
        <input
          id="email-create-password"
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
    {error && (
      <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    )}
    {isSuccess ? (
      <Button
        htmlType="button"
        onClick={onClose}
        text="Ověřovací email byl odeslán. Zkontrolujte svou schránku."
        variant="gold"
        size="md"
        loading={isLoading}
        className="w-full"
      />
    ) : (
      <Button
        htmlType="submit"
        text={isLoading ? "Odesílám..." : "Odeslat ověřovací email"}
        variant="gold"
        size="md"
        disabled={isLoading || !email}
        loading={isLoading}
        className="w-full"
      />
    )}
    <div className="flex flex-row justify-between mt-2">
      <LoginModalFooterButton
        onClick={footer.leftButton.onClick}
        text={footer.leftButton.text}
      />
      <LoginModalFooterButton
        onClick={footer.rightButton.onClick}
        text={footer.rightButton.text}
      />
    </div>
  </form>
);

export default CreatePasswordRequestScreen;
