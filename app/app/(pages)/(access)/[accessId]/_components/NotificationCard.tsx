import React from "react";
import { FiCalendar, FiExternalLink, FiInfo } from "react-icons/fi";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Notification } from "../page";
import { AlertTriangle } from "lucide-react";

type Props = {
  notification: Notification;
  icon?: React.ReactNode;
};

export default function NotificationCard({ notification, icon }: Props) {
  return (
    <div className="group w-full relative bg-white p-5 md:p-6 rounded-lg border-l-4 border-secondary/30 shadow-sm hover:shadow-md transition-all duration-200 hover:border-secondary">
      <div className="relative z-10">
        {/* Hlavní text */}
        <div className="mb-3 flex gap-3 items-center">
          {notification.date ? (
            <div className="shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          ) : (
            <div className="shrink-0 w-12 h-12 bg-emerald-600/10 rounded-lg flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
          <p className="text-base md:text-xl text-primary leading-relaxed">
            {notification.text}
          </p>
        </div>

        {/* Popis */}
        {notification.description && (
          <div className="mb-4 pl-0 md:pl-4 border-l-0 md:border-l-2 border-zinc-200">
            <p className="text-sm md:text-base text-textP leading-relaxed">
              {notification.description}
            </p>
          </div>
        )}

        {/* Datum a odkaz */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-3 border-t border-zinc-100">
          {notification.date && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-600">
              <FiCalendar className="text-secondary shrink-0" />
              <span>
                Do{" "}
                {format(new Date(notification.date), "d. MMMM yyyy", {
                  locale: cs,
                })}
              </span>
            </div>
          )}

          {notification.link && (
            <a
              href={notification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs md:text-sm text-secondary hover:text-tertiary transition-colors font-semibold"
            >
              <span>Více informací</span>
              <FiExternalLink className="text-sm shrink-0" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
