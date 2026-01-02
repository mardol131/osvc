import React from "react";
import NotificationCard from "./NotificationCard";
import {
  FiCode,
  FiBriefcase,
  FiTrendingUp,
  FiBookOpen,
  FiStar,
  FiGlobe,
} from "react-icons/fi";
import { Notification } from "../page";

type Props = {
  heading: string;
  notifications: Notification[];
};

export default function NotificationGroup({ heading, notifications }: Props) {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="mb-10 md:mb-12">
      {/* Hlavička skupiny */}
      <div className="mb-4 md:mb-6 pb-3 border-b-2 border-secondary/20">
        <h3 className="text-primary mb-1">{heading}</h3>
        <p className="text-textP text-sm md:text-base">
          {notifications.length}{" "}
          {notifications.length === 1
            ? "informace"
            : notifications.length < 5
            ? "informace"
            : "informací"}
        </p>
      </div>

      {/* Seznam notifikací */}
      <div className="flex flex-col gap-3 md:gap-4">
        {notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}
