import Link from "next/link";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const variantClasses = {
  gold: "bg-gradient-to-r from-secondary to-colorTo text-white",
  black: "bg-gradient-to-r from-primary to-zinc-800 text-white",
  outlined:
    "bg-transparent border-2 border-secondary text-secondary hover:bg-white",
  red: "bg-red-500 text-white",
  plain: "text-primary bg-white border border-zinc-50",
};

const sizeClasses = {
  xs: "text-sm py-2 px-4",
  sm: "text-base py-2 px-5",
  md: "md:text-lg text-base py-3 md:px-6 px-4",
  lg: "md:text-2xl text-xl py-4 md:px-8 px-6",
  xl: "md:text-3xl text-2xl py-5 md:px-10 px-8",
};

export type ButtonProps = {
  text: string;
  href?: string;
  target?: "_blank";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset";
  variant?: keyof typeof variantClasses;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  uppercase?: boolean;
};

export default function Button({
  text,
  href,
  target,
  size = "md",
  onClick,
  htmlType = "button",
  variant = "gold",
  className = "",
  disabled = false,
  loading = false,
  uppercase = true,
}: ButtonProps) {
  const baseClasses = `shadow-lg ${uppercase ? "uppercase" : ""} cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-default font-[500] hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out rounded-lg font-oswald flex items-center justify-center`;

  const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link
        onClick={onClick}
        className={combinedClassName}
        target={target}
        href={href}
      >
        {loading ? (
          <AiOutlineLoading className="animate-spin text-2xl" />
        ) : (
          text
        )}
      </Link>
    );
  } else {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
        type={htmlType}
      >
        {loading ? (
          <AiOutlineLoading className="animate-spin text-2xl" />
        ) : (
          text
        )}
      </button>
    );
  }
}
