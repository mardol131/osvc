export const productKind = {
  general_subscription: "general_subscription",
  activity_group_addon: "activity_group_addon",
};

export type ProductKind = keyof typeof productKind;
