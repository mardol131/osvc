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
import { Calendar, Info } from "lucide-react";

type Props = {
  heading: string;
  notifications: Notification[];
};

export default function NotificationGroup({ heading, notifications }: Props) {
  const infoOnly = notifications.filter((n) => !n.date);
  const obligationOnly = notifications.filter((n) => n.date);

  return (
    <div className="mb-10 md:mb-12">
      {/* Hlavička skupiny */}
      <div className="mb-4 md:mb-6 pb-3 border-b-2 border-secondary/20">
        <h3 className="text-primary mb-1">{heading}</h3>
        <div className="flex gap-4">
          <p className="text-emerald-600 text-sm md:text-base p-3 bg-emerald-600/10 rounded-lg">
            {infoOnly.length}{" "}
            {infoOnly.length === 0
              ? "novinek"
              : infoOnly.length === 1
                ? "novinka"
                : infoOnly.length < 5
                  ? "novinky"
                  : "novinek"}
          </p>
          <p className="text-secondary text-sm md:text-base p-3 bg-secondary/10 rounded-lg">
            {obligationOnly.length}{" "}
            {obligationOnly.length === 0
              ? "povinností"
              : obligationOnly.length === 1
                ? "povinnost"
                : obligationOnly.length < 5
                  ? "povinnosti"
                  : "povinností"}
          </p>
        </div>
      </div>

      {/* Seznam notifikací */}
      <div className="flex flex-col gap-3 md:gap-4">
        {notifications
          .sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            if (a.date && b.date) {
              return new Date(b.date).getTime() + new Date(a.date).getTime();
            }
            return 0;
          })
          .map((notification, index) => (
            <NotificationCard
              key={index}
              notification={notification}
              icon={notification.date ? <Calendar /> : <Info />}
            />
          ))}
      </div>
    </div>
  );
}
