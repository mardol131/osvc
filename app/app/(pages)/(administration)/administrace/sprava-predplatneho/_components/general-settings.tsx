"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, ChevronDown, Dot } from "lucide-react";
import Button from "@/app/_components/atoms/Button";
import {
  BrowserNotificationStatus,
  checkBrowserNotifications,
  disablePushNotifications,
  enablePushNotifications,
} from "@/app/_functions/notifications";

export default function GeneralSettings() {
  const [browserNotificationStatus, setBrowserNotificationStatus] =
    useState<BrowserNotificationStatus>("unsupported");
  const [isLoading, setIsLoading] = useState(true);
  const [isDisablingNotifications, setIsDisablingNotifications] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await checkBrowserNotifications();
      setBrowserNotificationStatus(status);
      setIsLoading(false);
    })();
  }, []);

  const enableNotificationsHandler = async () => {
    setIsLoading(true);

    try {
      const check = await checkBrowserNotifications();
      if (check === "enabled") {
        setBrowserNotificationStatus(check);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      alert(
        "Nepodařilo se zkontrolovat stav notifikací. Zkontrolujte nastavení prohlížeče.",
      );
      setIsLoading(false);
      return;
    }
    try {
      const { success } = await enablePushNotifications();
      if (success) {
        const status = await checkBrowserNotifications();
        setBrowserNotificationStatus(status);
      } else {
        alert(
          "Nepodařilo se povolit notifikace. Zkontrolujte nastavení prohlížeče.",
        );
      }
    } catch (error) {
      console.log(error);
      alert(
        "Nepodařilo se povolit notifikace. Zkontrolujte nastavení prohlížeče.",
      );
      setBrowserNotificationStatus("unsupported");
    } finally {
      setIsLoading(false);
    }
  };

  const disableNotificationsHandler = async () => {
    setIsDisablingNotifications(true);
    try {
      const { success } = await disablePushNotifications();
      if (success) {
        setBrowserNotificationStatus("supported");
      } else {
        alert(
          "Nepodařilo se vypnout notifikace. Zkontrolujte nastavení prohlížeče.",
        );
      }
    } catch (error) {
      alert(
        "Nepodařilo se vypnout notifikace. Zkontrolujte nastavení prohlížeče.",
      );
    } finally {
      setIsDisablingNotifications(false);
    }
  };

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Monkey-patch console.log aby se zobrazil v UI
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog(...args);
      setLogs((prev) => [...prev, args.map((a) => String(a)).join(" ")]);
    };

    const checkStatus = async () => {
      try {
        const status = await checkBrowserNotifications();
        setBrowserNotificationStatus(status);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };
    checkStatus();
  }, []);

  return (
    <div className="rounded-xl border w-full p-10 max-md:p-4 bg-white border-zinc-100 shadow-md">
      <div className="w-full flex flex-col gap-10 mx-auto">
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className="flex justify-between items-center gap-10 "
        >
          <h4>Nastavení zařízení</h4>
          <Button
            text={isExpanded ? "Zavřít" : "Otevřít"}
            variant="gold"
            size="xs"
          />
        </div>

        {/* Browser Notifications Status */}
        {isExpanded && (
          <div className="border-t-2 pt-3 border-zinc-100">
            <h5 className="text-primary mb-4">Stav notifikací</h5>

            <div className="mb-5 flex flex-col gap-3">
              <p>
                Notifikace se nastavují pro konkrétní prohlížeč a zařízení,
                nikoli přímo pro váš uživatelský účet v OSVČ365. To znamená:
              </p>
              <ul>
                <li className="flex items-start gap-2">
                  <Dot />
                  <p>
                    Notifikace uvidí každý, kdo na tomto zařízení používá stejný
                    prohlížečový profil.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <Dot />
                  <p>
                    Pokud jste přihlášeni do svého Chrome účtu, může se toto
                    nastavení synchronizovat i na další zařízení, kde používáte
                    stejný Chrome účet.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <Dot />
                  <p>
                    Pokud používáte jiný prohlížeč nebo jiné zařízení, je
                    potřeba notifikace povolit znovu.
                  </p>
                </li>
              </ul>
              <p>
                Z bezpečnostních důvodů proto notifikace neobsahují citlivé
                informace a slouží pouze jako upozornění, že je v aplikaci
                dostupná nová událost.
              </p>
            </div>
            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
              <div className="flex justify-between max-sm:flex-col max-sm:items-start items-center gap-4">
                {browserNotificationStatus === "enabled" ? (
                  <>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
                        <Bell className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900">
                          Notifikace jsou zapnuty
                        </p>
                        <p className="text-sm text-zinc-600 mt-1">
                          V tomto prohlížeči budete dostávat push notifikace
                        </p>
                      </div>
                    </div>
                  </>
                ) : browserNotificationStatus === "supported" ? (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                        <BellOff className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900">
                          Notifikace jsou vypnuty
                        </p>
                        <p className="text-sm text-zinc-600 mt-1">
                          Pokud chcete notifikace zapnout, klikněte na tlačítko
                          "Zapnout notifikace".
                        </p>
                      </div>
                    </div>
                  </>
                ) : browserNotificationStatus === "unsupported" ? (
                  <>
                    <div className="w-12 h-12 bg-zinc-200 rounded-lg flex items-center justify-center">
                      <BellOff className="w-6 h-6 text-zinc-600" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">
                        Prohlížeč notifikace nepodporuje
                      </p>
                      <p className="text-sm text-zinc-600 mt-1">
                        Váš prohlížeč nebo zařízení nepodporuje push notifikace
                      </p>
                    </div>
                  </>
                ) : null}
                {(browserNotificationStatus === "supported" ||
                  browserNotificationStatus === "enabled") && (
                  <Button
                    variant={
                      browserNotificationStatus === "enabled" ? "red" : "black"
                    }
                    size="xs"
                    text={
                      browserNotificationStatus === "supported"
                        ? "Zapnout"
                        : "Vypnout"
                    }
                    onClick={
                      browserNotificationStatus === "enabled"
                        ? disableNotificationsHandler
                        : enableNotificationsHandler
                    }
                    disabled={isDisablingNotifications}
                    loading={isLoading}
                  />
                )}
              </div>
            </div>
            {logs.length > 0 && (
              <div className="mt-4 p-3 bg-blue-100 text-xs text-blue-800 rounded font-mono max-h-48 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
