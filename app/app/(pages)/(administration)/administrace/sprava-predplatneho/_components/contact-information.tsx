"use client";

import { useState, useRef, useEffect } from "react";
import { updateRecord } from "@/app/_functions/backend";
import Button from "@/app/_components/atoms/Button";

interface ContactInformationProps {
  subscribeId: string;
  initialEmail: string;
  initialPhone: string;
  initialPhonePrefix: string;
}

export default function ContactInformation({
  subscribeId,
  initialEmail,
  initialPhone,
  initialPhonePrefix,
}: ContactInformationProps) {
  const [savedEmail, setSavedEmail] = useState(initialEmail);
  const [savedPhone, setSavedPhone] = useState(initialPhone);
  const [savedPhonePrefix, setSavedPhonePrefix] = useState(initialPhonePrefix);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [phonePrefix, setPhonePrefix] = useState(initialPhonePrefix);
  const [isSaving, setIsSaving] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detekce změn - porovnání s posledně uloženýma hodnotama
  const isModified =
    email !== savedEmail ||
    phone !== savedPhone ||
    phonePrefix !== savedPhonePrefix;

  // Zavřít dropdown při kliknutí mimo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value.replace(/\D/g, "").slice(0, 9);
    setPhone(value);
  };

  const handleSaveContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    if (!phone || phone.length !== 9) {
      alert("Zadejte platné telefonní číslo.");
      setIsSaving(false);
      return;
    }

    if (!phonePrefix) {
      alert("Zadejte platný telefonní prefix.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await updateRecord({
        collectionSlug: "subscribes",
        recordId: subscribeId,
        body: {
          email: email,
          phone: phone,
          phonePrefix: phonePrefix,
        },
      });

      if (!response.id) {
        throw new Error("Nepodařilo se aktualizovat kontaktní údaje");
      }

      // Aktualizuj "uložené" hodnoty bez reloadu
      setSavedEmail(email);
      setSavedPhone(phone);
      setSavedPhonePrefix(phonePrefix);
    } catch (error) {
      alert("Chyba při ukládání kontaktních údajů. Zkuste znovu.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEmail(savedEmail);
    setPhone(savedPhone);
    setPhonePrefix(savedPhonePrefix);
  };

  return (
    <div className="mb-6 flex flex-col items-start justify-between">
      <div className="w-full mb-4">
        <h5 className="text-primary mb-1">Kontaktní údaje</h5>
        <p className="text-sm text-zinc-600">
          Email a telefonní číslo pro komunikaci
        </p>
      </div>

      <form
        onSubmit={handleSaveContact}
        className="bg-zinc-50 rounded-lg p-6 border border-zinc-100 w-full"
      >
        <div className="flex flex-col gap-5">
          {/* Email - editovatelné */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 mb-2"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 w-full rounded-lg border bg-white border-zinc-300 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
              required
            />
          </div>

          {/* Telefonní číslo */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Telefon
            </label>
            <div className="flex gap-2">
              {/* Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-20 shrink-0 rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300 cursor-pointer bg-white flex items-center justify-between"
                >
                  <p>+{phonePrefix}</p>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-20 bg-white border-2 border-zinc-300 rounded-lg shadow-lg z-10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        setPhonePrefix("420");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-100 transition-colors ${
                        phonePrefix === "420"
                          ? "bg-secondary/10 text-secondary"
                          : "text-zinc-800"
                      }`}
                    >
                      +420
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhonePrefix("421");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-100 transition-colors ${
                        phonePrefix === "421"
                          ? "bg-secondary/10 text-secondary"
                          : "text-zinc-800"
                      }`}
                    >
                      +421
                    </button>
                  </div>
                )}
              </div>

              <input
                type="tel"
                id="phone"
                value={phone}
                onInput={handlePhoneInput}
                className="flex-1 min-w-0 rounded-lg border bg-white border-zinc-300 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary hover:border-zinc-300"
                placeholder="123456789"
                maxLength={9}
                minLength={9}
                pattern="[0-9]{9}"
                required
              />
            </div>
          </div>

          {/* Tlačítka - viditelná jen když jsou data změněná */}
          {isModified && (
            <div className="flex gap-3 pt-4 border-t w-full justify-end border-zinc-200">
              <Button
                text={isSaving ? "Ukládám..." : "Uložit"}
                htmlType="submit"
                disabled={isSaving}
                loading={isSaving}
              />
              <Button
                text="Zrušit"
                onClick={handleCancel}
                variant="plain"
                htmlType="button"
                disabled={isSaving}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
