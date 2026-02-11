"use client";

import React, { ReactNode, useEffect } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  component?: ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function ModalLayout({
  isOpen,
  onClose,
  title,
  description,
  component,
  children,
  maxWidth = "2xl",
}: ModalLayoutProps) {
  // Zabránit scrollování pozadí, když je modal otevřený
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Zavřít při stisku ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-50 bg-black/80 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] flex flex-col pointer-events-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - sticky */}
          <div className="sticky top-0 bg-white z-10 p-5 lg:p-8  rounded-t-2xl border-b border-zinc-100 flex flex-col justify-between items-start">
            <div
              className={`flex justify-between w-full items-center gap-7 ${description || component ? "mb-7" : ""}`}
            >
              <h3 className="-mb-4">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-700 transition-colors"
                aria-label="Zavřít"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {description && <p>{description}</p>}{" "}
              {component && <div>{component}</div>}
            </div>
          </div>

          {/* Scrollovatelný obsah */}
          <div className="flex-1 overflow-y-auto p-5 lg:p-8">{children}</div>
        </div>
      </div>
    </>
  );
}
