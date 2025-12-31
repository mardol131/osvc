import { getCollection } from "@/app/_functions/backend";
import { redirect } from "next/navigation";
import React from "react";
import Dashboard from "./_components/Dashboard";

type Props = {};

export default async function page({}: Props) {
  try {
    const response = await getCollection("activity-groups");
    return <Dashboard activityGroups={response} />;
  } catch (error) {
    console.error("Error fetching activity groups:", error);
    return redirect("/admin");
  }
}
