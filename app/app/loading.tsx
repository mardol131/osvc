import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className=" fixed top-0 w-screen h-screen flex items-center flex-col gap-3 justify-center bg-white z-999">
      <h3>Načítání</h3>
      <AiOutlineLoading className="animate-spin text-3xl text-black" />
    </div>
  );
}
