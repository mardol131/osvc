"use client";

import Link from "next/link";

export default function BuyButton() {
  return (
    <Link
      href="/subscribe"
      className="p-2 md:hidden fixed shadow-lg shadow-secondary/30 bottom-5 right-5 rounded-lg bg-secondary flex items-center justify-center cursor-pointer hover:bg-secondary transition-all ease-in-out z-40"
    >
      <p className="text-textLight">Koupit předplatné</p>
    </Link>
  );
}
