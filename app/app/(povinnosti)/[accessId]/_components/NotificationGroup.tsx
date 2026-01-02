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

const getIcon = (groupKey: string) => {
  const iconClass = "text-3xl";
  switch (groupKey) {
    case "general":
      return <FiGlobe className={iconClass} />;
    case "it_services":
      return <FiCode className={iconClass} />;
    case "consulting":
      return <FiBriefcase className={iconClass} />;
    case "marketing":
      return <FiTrendingUp className={iconClass} />;
    case "education":
      return <FiBookOpen className={iconClass} />;
    case "culture_sport":
      return <FiStar className={iconClass} />;
    default:
      return <FiGlobe className={iconClass} />;
  }
};

export default function NotificationGroup({ heading, notifications }: Props) {
  return (
    <div className="mb-12">
      {/* Hlavička skupiny */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-primary wrap-break-word">{heading}</h3>
          <p className="text-textP text-base">
            {notifications.length}{" "}
            {notifications.length === 0
              ? "aktuálních informací"
              : notifications.length === 1
              ? "aktuální informace"
              : notifications.length < 5
              ? "aktuální informace"
              : "aktuálních informací"}
          </p>
        </div>
      </div>

      {/* Seznam notifikací */}
      <div className="flex flex-col gap-4">
        {notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}
