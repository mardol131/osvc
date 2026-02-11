"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, ChevronDown, Dot, Smartphone } from "lucide-react";
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
  const [isHowToExpanded, setIsHowToExpanded] = useState(false);

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
      console.log(status);
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

              {isHowToExpanded && (
                <div className="mt-4 space-y-6">
                  {/* iPhone */}
                  <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
                    <h6 className="font-semibold text-zinc-900 mb-3">
                      iPhone (Safari)
                    </h6>
                    <p className="text-sm text-zinc-600 mb-3">
                      Na iPhonu je potřeba nejdříve přidat OSVČ365 na plochu
                      jako aplikaci:
                    </p>
                    <ol className="space-y-2 text-sm text-zinc-700">
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          1.
                        </span>
                        <span>
                          Otevřete{" "}
                          <span className="font-medium">osvc365.cz</span> v
                          Safari (jiné prohlížeče na iPhonu notifikace
                          nepodporují).
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          2.
                        </span>
                        <span>
                          Klepněte na ikonu{" "}
                          <span className="font-medium">Sdílet</span> (čtverec
                          se šipkou nahoru) ve spodní liště.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          3.
                        </span>
                        <span>
                          Vyberte{" "}
                          <span className="font-medium">Přidat na plochu</span>{" "}
                          a potvrďte.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          4.
                        </span>
                        <span>
                          Otevřete aplikaci OSVČ365 z plochy (ne ze Safari).
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          5.
                        </span>
                        <span>
                          Přejděte do této sekce a klepněte na{" "}
                          <span className="font-medium">Zapnout</span>.
                        </span>
                      </li>
                    </ol>
                    <p className="text-xs text-zinc-500 mt-3">
                      Notifikace na iPhonu fungují pouze v aplikaci přidané na
                      plochu. Vyžaduje iOS 16.4 nebo novější.
                    </p>
                  </div>

                  {/* Android */}
                  <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
                    <h6 className="font-semibold text-zinc-900 mb-3">
                      Android (Chrome)
                    </h6>
                    <p className="text-sm text-zinc-600 mb-3">
                      Na Androidu můžete notifikace zapnout přímo v prohlížeči,
                      nebo si přidat aplikaci na plochu:
                    </p>
                    <ol className="space-y-2 text-sm text-zinc-700">
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          1.
                        </span>
                        <span>
                          Otevřete{" "}
                          <span className="font-medium">osvc365.cz</span> v
                          Chrome.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          2.
                        </span>
                        <span>
                          Přejděte do této sekce a klepněte na{" "}
                          <span className="font-medium">Zapnout</span>.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          3.
                        </span>
                        <span>
                          Když se objeví dotaz na povolení notifikací, klepněte
                          na <span className="font-medium">Povolit</span>.
                        </span>
                      </li>
                    </ol>
                    <p className="text-sm text-zinc-600 mt-4 mb-2">
                      Pro lepší zážitek si můžete přidat aplikaci na plochu:
                    </p>
                    <ol className="space-y-2 text-sm text-zinc-700">
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          1.
                        </span>
                        <span>
                          Klepněte na tři tečky v pravém horním rohu Chrome.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-zinc-900 shrink-0">
                          2.
                        </span>
                        <span>
                          Vyberte{" "}
                          <span className="font-medium">Přidat na plochu</span>{" "}
                          nebo{" "}
                          <span className="font-medium">
                            Nainstalovat aplikaci
                          </span>
                          .
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
