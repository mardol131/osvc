"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, ChevronDown, Dot, Smartphone } from "lucide-react";
import Button from "@/app/_components/atoms/Button";
import {
  BrowserNotificationStatus,
  usePushNotifications,
} from "@/app/_functions/notifications";
import { useAuth } from "@/app/_context/auth-context";
import HowToUseNotificationOnPhone from "./howToUseNotificationOnPhone";

export default function GeneralSettings() {
  const [browserNotificationStatus, setBrowserNotificationStatus] =
    useState<BrowserNotificationStatus>("unsupported");
  const [isLoading, setIsLoading] = useState(true);
  const [isDisablingNotifications, setIsDisablingNotifications] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHowToExpanded, setIsHowToExpanded] = useState(false);
  const auth = useAuth();

  const {
    checkBrowserNotifications,
    enablePushNotifications,
    disablePushNotifications,
  } = usePushNotifications();

  useEffect(() => {
    (async () => {
      const status = await checkBrowserNotifications();
      setBrowserNotificationStatus(status);
      setIsLoading(false);
    })();
  }, []);

  const enableNotificationsHandler = async () => {
    setIsLoading(true);

    const currentStatus = await checkBrowserNotifications();
    console.log("Aktuální stav notifikací:", currentStatus);
    // Již povoleno - není co dělat
    if (currentStatus === "enabled") {
      setBrowserNotificationStatus(currentStatus);
      setIsLoading(false);
      return;
    }

    // Nelze povolit - informovat uživatele
    if (currentStatus === "denied") {
      alert(
        "Notifikace jsou zablokované v nastavení prohlížeče. Povolte je ručně a obnovte stránku.",
      );
      setBrowserNotificationStatus(currentStatus);
      setIsLoading(false);
      return;
    }

    if (currentStatus === "unsupported") {
      alert("Váš prohlížeč nepodporuje push notifikace.");
      setBrowserNotificationStatus(currentStatus);
      setIsLoading(false);
      return;
    }

    // Pokus o povolení
    const result = await enablePushNotifications();

    if (result.success) {
      const status = await checkBrowserNotifications();
      setBrowserNotificationStatus(status);
    } else {
      // Použijeme konkrétní message z výsledku
      alert(result.message);
      // Aktualizujeme stav (mohl se změnit na denied)
      const status = await checkBrowserNotifications();
      setBrowserNotificationStatus(status);
    }

    setIsLoading(false);
  };

  const disableNotificationsHandler = async () => {
    setIsDisablingNotifications(true);

    const result = await disablePushNotifications();

    if (result.success) {
      setBrowserNotificationStatus("supported");
    } else {
      alert(result.message);
    }

    setIsDisablingNotifications(false);
  };

  return (
    <div className="rounded-xl border w-full p-10 max-md:p-4 bg-white border-zinc-100 shadow-md">
      <div className="w-full flex flex-col gap-10 mx-auto">
        {/* Sekce 1: Zapnout notifikace pro tento účet */}

        {/* Sekce 2: Nastavení zařízení */}
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
            <h5 className="text-primary mb-4">Push notifikace</h5>

            <div className="mb-5 flex flex-col gap-3">
              <p>
                Notifikace se nastavují pro konkrétní prohlížeč a zařízení.
                Pokud chcete využívat notifikace i na jiném zařízení, stačí se
                tam přihlásit a zapnout notifikace.
              </p>
              <p>
                Pro jedno nastavení prohlížeče (chrome account, windows účet
                apod.) může mít aktivní notifikace pouze jeden účet. Pokud je v
                tomto nastavení aktivujete, bude je přijímat pouze tento účet.
                Notifikace přijímáte i ve chvíli, kdy nejste přihlášení.
              </p>
            </div>
            <div className="flex flex-col gap-4">
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
                            V tuto chvíli přijímáte notifikace
                          </p>
                          <p className="text-sm text-zinc-600 mt-1">
                            V tomto prohlížeči již můžete dostávat push
                            notifikace
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
                            Pokud chcete notifikace zapnout, klikněte na
                            tlačítko "Zapnout notifikace".
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
                          Váš prohlížeč nebo zařízení nepodporuje push
                          notifikace
                        </p>
                      </div>
                    </>
                  ) : null}
                  {(browserNotificationStatus === "supported" ||
                    browserNotificationStatus === "enabled") && (
                    <Button
                      variant={
                        browserNotificationStatus === "enabled"
                          ? "red"
                          : "black"
                      }
                      size="xs"
                      text={
                        browserNotificationStatus === "supported"
                          ? "Zapnout pro tento prohlížeč"
                          : browserNotificationStatus === "enabled"
                            ? "Vypnout pro tento prohlížeč"
                            : browserNotificationStatus === "denied"
                              ? "Povolte notifikace v prohlížeči"
                              : "Notifikace nejsou podporovány"
                      }
                      onClick={
                        browserNotificationStatus === "enabled"
                          ? disableNotificationsHandler
                          : browserNotificationStatus === "supported"
                            ? enableNotificationsHandler
                            : undefined
                      }
                      disabled={isDisablingNotifications}
                      loading={isLoading}
                    />
                  )}
                </div>
              </div>
              {/* <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
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
                            Pokud chcete notifikace zapnout, klikněte na
                            tlačítko "Zapnout notifikace".
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
                          Váš prohlížeč nebo zařízení nepodporuje push
                          notifikace
                        </p>
                      </div>
                    </>
                  ) : null}
                  {(browserNotificationStatus === "supported" ||
                    browserNotificationStatus === "enabled") && (
                    <Button
                      variant={
                        browserNotificationStatus === "enabled"
                          ? "red"
                          : "black"
                      }
                      size="xs"
                      text={
                        browserNotificationStatus === "supported"
                          ? "Zapnout pro tento prohlížeč"
                          : browserNotificationStatus === "enabled"
                            ? "Vypnout pro tento prohlížeč"
                            : browserNotificationStatus === "denied"
                              ? "Povolte notifikace v prohlížeči"
                              : "Notifikace nejsou podporovány"
                      }
                      onClick={
                        browserNotificationStatus === "enabled"
                          ? disableNotificationsHandler
                          : browserNotificationStatus === "supported"
                            ? enableNotificationsHandler
                            : undefined
                      }
                      disabled={isDisablingNotifications}
                      loading={isLoading}
                    />
                  )}
                </div>
              </div> */}
            </div>

            {/* Návod jak zapnout na telefonu */}
            <div className="mt-6">
              <button
                onClick={() => setIsHowToExpanded(!isHowToExpanded)}
                className="flex items-center gap-2 text-left w-full group"
              >
                <Smartphone className="w-5 h-5 text-zinc-500" />
                <span className="font-medium text-zinc-700 group-hover:text-zinc-900">
                  Jak zapnout notifikace na telefonu?
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    isHowToExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isHowToExpanded && <HowToUseNotificationOnPhone />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
