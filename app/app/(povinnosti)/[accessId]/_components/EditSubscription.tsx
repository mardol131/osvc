"use client";

import Button from "@/app/_components/atoms/Button";
import { scrollToElement } from "@/app/_functions/scrollToElement";

type Props = {};

export default function EditSubscription({}: Props) {
  return (
    <div className="w-full mx-auto mb-8 md:mb-10">
      <div className="flex justify-end">
        <Button
          text="Upravit předplatné"
          variant="black"
          onClick={() => {
            const element = document.querySelector(`#subscription-management`);
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
