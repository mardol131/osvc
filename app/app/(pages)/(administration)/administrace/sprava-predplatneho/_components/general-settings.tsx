"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, ChevronDown, Dot } from "lucide-react";
import Button from "@/app/_components/atoms/Button";

export default function GeneralSettings() {
  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] =
    useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisablingNotifications, setIsDisablingNotifications] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    checkBrowserNotifications();
  }, []);

  const checkBrowserNotifications = async () => {
    try {
      // Kontrola, zda prohlížeč podporuje service workers a push
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setBrowserNotificationsEnabled(null);
        setIsLoading(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      setBrowserNotificationsEnabled(!!subscription);
    } catch (error) {
      setBrowserNotificationsEnabled(null);
    } finally {
      setIsLoading(false);
    }
  };

  const enablePush = async () => {
    try {
      setIsLoading(true);

      // Kontrola podpory
      if (!("Notification" in window)) {
        alert("Váš prohlížeč nepodporuje notifikace.");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        alert("Váš prohlížeč nepodporuje notifikace.");
        return;
      }

      // Žádost o povolení
      const permission = await Notification.requestPermission();

      if (permission === "denied") {
        alert(
          "Notifikace byly zamítnuty. Povolte je v nastavení prohlížeče a zkuste znovu.",
        );
        return;
      }

      if (permission !== "granted") {
        return;
      }

      // Registrace service workeru
      const registration = await navigator.serviceWorker.register(
        "/notifications-worker.js",
      );

      // Subscribe na push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });

      // Odeslání na backend
      const response = await fetch("/api/notifications/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error("Chyba při registraci notifikací");
      }

      alert("Notifikace byly úspěšně zapnuty!");
      checkBrowserNotifications(); // Přidej tuto řádku
    } catch (error) {
      const message = error instanceof Error ? error.message : "Neznámá chyba";
      alert(`Chyba: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disablePush = async () => {
    try {
      setIsDisablingNotifications(true);
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        alert("Notifikace byly úspěšně vypnuty!");
      } else {
        alert("Nejste přihlášeni k odběru notifikací.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Neznámá chyba";
      alert(`Chyba: ${message}`);
    } finally {
      setIsDisablingNotifications(false);
      checkBrowserNotifications();
    }
  };

  return (
    <div className="rounded-xl border w-full p-10 max-md:p-4 bg-white border-zinc-100 shadow-md">
      <div className="w-full flex flex-col gap-10 mx-auto">
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className="flex justify-between items-center gap-10 border-b-2 pb-3 border-zinc-100"
        >
          <h4>Obecná nastavení</h4>
          <Button
            text={isExpanded ? "Zavřít" : "Otevřít"}
            variant="gold"
            size="xs"
          />
        </div>

        {/* Browser Notifications Status */}
        {isExpanded && (
          <div>
            <h5 className="text-primary mb-4">Stav notifikací v prohlížeči</h5>
            <div className="mb-5">
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
                {browserNotificationsEnabled ? (
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
                ) : browserNotificationsEnabled === false ? (
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
                ) : (
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
                )}
                {(browserNotificationsEnabled === false ||
                  browserNotificationsEnabled) && (
                  <Button
                    variant={browserNotificationsEnabled ? "red" : "black"}
                    size="xs"
                    text={
                      browserNotificationsEnabled === false
                        ? "Zapnout"
                        : "Vypnout"
                    }
                    onClick={
                      browserNotificationsEnabled ? disablePush : enablePush
                    }
                    disabled={isDisablingNotifications}
                    loading={isLoading}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
