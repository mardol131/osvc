"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { login } from "@/app/_functions/backend";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);

      setTimeout(() => {
        router.push("/admin/general");
      }, 10);
    } catch (err: any) {
      setError(err.message || "Nastala chyba při přihlašování.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center p-4">
      {/* Dekorativní pozadí */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header Card */}
        <div className="bg-gradient-to-br from-primary via-zinc-800 to-zinc-900 rounded-3xl rounded-b-none p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin přístup
            </h1>
            <p className="text-zinc-300">Přihlaste se do administrace</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl rounded-t-none shadow-2xl p-8 border-2 border-zinc-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-primary"
                placeholder="vas@email.cz"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Heslo
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-primary"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                <span className="text-red-600 text-xl">⚠️</span>
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-secondary to-tertiary hover:from-tertiary hover:to-secondary text-primary font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Přihlašování...
                </span>
              ) : (
                "Přihlásit se"
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <p className="text-xs text-zinc-500 text-center">
              🔒 Zabezpečené přihlášení pouze pro administrátory
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2"
          >
            ← Zpět na hlavní stránku
          </a>
        </div>
      </div>
    </div>
  );
}
