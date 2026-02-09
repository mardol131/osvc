"use client";

import React from "react";
import OrderSummaryDesktop from "./OrderSummaryDesktop";
import OrderSummaryMobile from "./OrderSummaryMobile";

export type OrderFormData = {
  subscriptionEmail: string;
  orderEmail: string;
  phone: string;
  phonePrefix: string;
  terms: boolean;
  marketing?: boolean;
};

export type SelectedActivities = Array<{ label: string; price: number }>;

type Props = {
  selectedActivities: SelectedActivities;
  onSubmit: (data: OrderFormData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting?: boolean;
};

export default function OrderSummary({
  selectedActivities,
  onSubmit,
  isOpen,
  onOpenChange,
  isSubmitting = false,
}: Props) {
  return (
    <>
      {/* Desktop verze - hidden na mobilu */}
      <div className="hidden lg:block">
        <OrderSummaryDesktop
          selectedActivities={selectedActivities}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Mobilní verze - hidden na desktopu */}
      <div className="lg:hidden">
        <OrderSummaryMobile
          selectedActivities={selectedActivities}
          onSubmit={onSubmit}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
