import Link from "next/link";
import React from "react";

const variantClasses = {
  gold: "bg-gradient-to-r from-secondary to-colorTo text-white",
  black: "bg-gradient-to-r from-primary to-zinc-800 text-white",
  outlined:
    "bg-transparent border-2 border-secondary text-secondary hover:bg-white hover:text-zinc-900",
};

type Props = {
  text: string;
  href?: string;
  target?: "_blank";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset";
  variant?: keyof typeof variantClasses;
  className?: string;
  disabled?: boolean;
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
}: Props) {
  const sizeClasses = {
    xs: "text-sm py-2 px-4",
    sm: "text-base py-2 px-5",
    md: "md:text-lg text-base py-3 md:px-6 px-4",
    lg: "md:text-2xl text-xl py-4 md:px-8 px-6",
    xl: "md:text-3xl text-2xl py-5 md:px-10 px-8",
  };

  const baseClasses =
    "shadow-lg uppercase cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-default font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out rounded-lg font-oswald flex items-center justify-center";

  const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link
        target={target}
        href={href}
        className={combinedClassName}
        onClick={onClick}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
      type={htmlType}
    >
      {text}
    </button>
  );
}
