import React from "react";
import Button from "@/app/_components/atoms/Button";
import LoginModalFooterButton from "./login-modal-footer-button";

interface SetPasswordScreenProps {
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
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

const SetPasswordScreen: React.FC<SetPasswordScreenProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  isSuccess,
  error,
  onSubmit,
  footer,
  onClose,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-6">
    {!isSuccess && (
      <>
        {" "}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="new-password"
            className="text-md font-medium text-zinc-700"
          >
            Nové heslo
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nové heslo"
            className="px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-zinc-900 placeholder:text-zinc-400"
            disabled={isLoading}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirm-password"
            className="text-md font-medium text-zinc-700"
          >
            Potvrzení hesla
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Zadejte heslo znovu"
            className="px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-zinc-900 placeholder:text-zinc-400"
            disabled={isLoading}
            required
          />
        </div>
      </>
    )}
    {error && (
      <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    )}
    {isSuccess ? (
      <Button
        htmlType="button"
        onClick={footer.leftButton.onClick}
        text="Heslo bylo úspěšně nastaveno. Nyní se můžete přihlásit."
        variant="gold"
        size="md"
        loading={isLoading}
        className="w-full"
      />
    ) : (
      <Button
        htmlType="submit"
        text={isLoading ? "Nastavuji..." : "Nastavit heslo"}
        variant="gold"
        size="md"
        disabled={isLoading || !newPassword || !confirmPassword}
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

export default SetPasswordScreen;
