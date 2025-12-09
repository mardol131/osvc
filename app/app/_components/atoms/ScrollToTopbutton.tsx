"use client";

import React from "react";
import { FaCaretSquareUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="p-1 fixed bottom-10 right-10 rounded-lg bg-primary flex items-center justify-center cursor-pointer hover:bg-secondary transition-all ease-in-out z-40"
    >
      <FaCaretSquareUp className="text-textLight text-3xl" />
    </div>
  );
}
