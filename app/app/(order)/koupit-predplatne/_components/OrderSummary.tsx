"use client";

import React from "react";
import OrderSummaryDesktop from "./OrderSummaryDesktop";
import OrderSummaryMobile from "./OrderSummaryMobile";

export type OrderFormData = {
  email: string;
  phone: string;
  phonePrefix: string;
  terms?: boolean;
};

type Props = {
  selectedActivities: Array<{ name: string; price: number }>;
  onSubmit: (data: OrderFormData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function OrderSummary({
  selectedActivities,
  onSubmit,
  isOpen,
  onOpenChange,
}: Props) {
  return (
    <>
      {/* Desktop verze - hidden na mobilu */}
      <div className="hidden lg:block">
        <OrderSummaryDesktop
          selectedActivities={selectedActivities}
          onSubmit={onSubmit}
        />
      </div>

      {/* Mobilní verze - hidden na desktopu */}
      <div className="lg:hidden">
        <OrderSummaryMobile
          selectedActivities={selectedActivities}
          onSubmit={onSubmit}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </>
  );
}
