import React from "react";
import { FiCalendar, FiExternalLink, FiInfo } from "react-icons/fi";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Notification } from "../page";

type Props = {
  notification: Notification;
};

export default function NotificationCard({ notification }: Props) {
  return (
    <div className="group w-full relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-200 hover:border-secondary/30">
      {/* Dekorativní gradient při hover */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>

      <div className="relative z-10">
        {/* Hlavní text */}
        <div className="flex items-start gap-3 mb-3">
          <div className="shrink-0 max-lg:hidden w-10 h-10 bg-linear-to-br from-secondary/20 to-tertiary/20 rounded-lg flex items-center justify-center text-secondary mt-1">
            <FiInfo className="text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg text-primary wrap-break-word leading-relaxed">
              {notification.text}
            </p>
          </div>
        </div>

        {/* Popis */}
        {notification.description && (
          <div className="mb-3">
            <p className="text-base text-textP leading-relaxed">
              {notification.description}
            </p>
          </div>
        )}

        {/* Datum a odkaz */}
        <div className="flex flex-wrap items-center gap-4">
          {notification.date && (
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <FiCalendar className="text-secondary" />
              <span>
                Termín:{" "}
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
              className="inline-flex items-center gap-2 text-sm text-secondary hover:text-tertiary transition-colors font-semibold"
            >
              <span>Více informací</span>
              <FiExternalLink className="text-base" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
