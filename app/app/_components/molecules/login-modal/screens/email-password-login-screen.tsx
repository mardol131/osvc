import React from "react";
import Button from "@/app/_components/atoms/Button";
import LoginModalFooterButton from "./login-modal-footer-button";

interface EmailPasswordLoginScreenProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
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
}

const EmailPasswordLoginScreen: React.FC<EmailPasswordLoginScreenProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  error,
  onSubmit,
  footer,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <label
        htmlFor="email-login"
        className="text-md font-medium text-zinc-700"
      >
        E-mail
      </label>
      <input
        id="email-login"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vas@email.com"
        className="px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-zinc-900 placeholder:text-zinc-400"
        disabled={isLoading}
        required
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="password" className="text-md font-medium text-zinc-700">
        Heslo
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Zadejte heslo"
        className="px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-zinc-900 placeholder:text-zinc-400"
        disabled={isLoading}
        required
      />
    </div>
    {error && (
      <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    )}
    <Button
      htmlType="submit"
      text={isLoading ? "Přihlašuji..." : "Přihlásit se"}
      variant="gold"
      size="md"
      disabled={isLoading || !email || !password}
      loading={isLoading}
      className="w-full"
    />
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

export default EmailPasswordLoginScreen;
