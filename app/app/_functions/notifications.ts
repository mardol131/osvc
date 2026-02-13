import { stringify } from "qs-esm";
import {
  createRecord,
  deleteRecord,
  deleteRecords,
  getCollection,
  getSingleRecord,
  updateRecord,
  updateRecords,
} from "./backend";
import { useAuth } from "../_context/auth-context";

export type NotificationResult = {
  success: boolean;
  message: string;
};

export type PushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

// Klientské funkce pro registraci/odhlášení (používají fetch)
export type BrowserNotificationStatus =
  | "supported" // Lze zapnout
  | "enabled" // Jsou zapnuty
  | "denied" // Zamítnuty - nelze zapnout
  | "unsupported"; // Prohlížeč nepodporuje

export function usePushNotifications() {
  const { user } = useAuth();

  const checkBrowserNotifications =
    async (): Promise<BrowserNotificationStatus> => {
      try {
        console.log("1. Kontrola API...");

        if (
          !("serviceWorker" in navigator) ||
          !("PushManager" in window) ||
          !("Notification" in window)
        ) {
          console.log("Něco z API chybí");
          return "unsupported";
        }

        console.log("2. Kontrola permission...");
        if (Notification.permission === "denied") {
          console.log("Permission je denied");
          return "denied";
        }

        console.log("3. Kontrola Service Worker...");

        // Na iOS PWA je serviceWorker.ready problematický
        // Zkus getRegistrations() místo toho
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log("3a. Registrations count:", registrations.length);

        if (registrations.length === 0) {
          console.log("4. Vracím: supported (žádná registration)");
          return "supported";
        }

        console.log("3b. Checking subscription...");
        const subscription =
          await registrations[0].pushManager.getSubscription();
        console.log("3c. Subscription:", subscription);

        const pushSubscription = await getCollection({
          collectionSlug: "push-subscriptions",
          query: stringify(
            {
              endpoint: subscription?.endpoint || "",
            },
            {
              encodeValuesOnly: true,
            },
          ),
        });

        console.log("3d. Push subscription from backend:", pushSubscription);

        const result =
          subscription &&
          pushSubscription.length > 0 &&
          pushSubscription[0].account
            ? "enabled"
            : "supported";
        console.log("4. Vracím:", result);

        return result;
      } catch (error) {
        console.error("Chyba:", error instanceof Error ? error.message : error);
        return "unsupported";
      }
    };

  const convertArrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    return btoa(String.fromCharCode(...bytes));
  };

  const enablePushNotifications = async (): Promise<NotificationResult> => {
    try {
      if (!("Notification" in window)) {
        return {
          success: false,
          message: "Váš prohlížeč nepodporuje notifikace.",
        };
      }

      if (!("serviceWorker" in navigator)) {
        return {
          success: false,
          message: "Váš prohlížeč nepodporuje notifikace.",
        };
      }

      const permission = await Notification.requestPermission();

      if (permission === "denied") {
        return {
          success: false,
          message:
            "Notifikace byly zamítnuty. Povolte je v nastavení prohlížeči a zkuste znovu.",
        };
      }

      if (permission !== "granted") {
        return {
          success: false,
          message: "Povolení notifikací nebylo uděleno.",
        };
      }

      // Registrujeme service worker
      const registration = await navigator.serviceWorker.register(
        "/notifications-worker.js",
      );

      // Počkáme až bude service worker aktivní (důležité pro iOS PWA)
      if (!registration.active) {
        await new Promise<void>((resolve) => {
          const sw = registration.installing || registration.waiting;
          if (!sw) {
            resolve();
            return;
          }
          sw.addEventListener("statechange", () => {
            if (sw.state === "activated") {
              resolve();
            }
          });
        });
      }

      let subscription = await registration.pushManager.getSubscription();

      // Pokud subscription existuje v prohlížeči
      if (subscription) {
        console.log(
          "Subscription již existuje, aktualizuji záznam v backendu...",
        );

        const sub = await getCollection({
          collectionSlug: "push-subscriptions",
          query: stringify(
            {
              endpoint: subscription.endpoint,
            },
            {
              encodeValuesOnly: true,
            },
          ),
        });

        if (sub.length > 0) {
          console.log("Záznam pro subscription existuje, aktualizuji...");
          await updateRecord({
            collectionSlug: "push-subscriptions",
            recordId: sub[0].id,
            query: stringify(
              {
                endpoint: subscription.endpoint,
              },
              {
                encodeValuesOnly: true,
              },
            ),
            body: {},
          });

          return {
            success: true,
            message: "Notifikace byly zapnuty.",
          };
        }
      }

      // Pokud subscription v prohlížeči neexistuje nebo nešel updatovat - vytvoř nový
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });
      const p256dh = subscription.getKey("p256dh");
      const auth = subscription.getKey("auth");

      console.log("New subscription:", subscription);

      await createRecord({
        collectionSlug: "push-subscriptions",
        body: {
          endpoint: subscription.endpoint,
          p256dh: p256dh ? convertArrayBufferToBase64(p256dh) : "",
          auth: auth ? convertArrayBufferToBase64(auth) : "",
        },
      });

      return {
        success: true,
        message: "Notifikace byly zapnuty.",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Neznámá chyba";
      console.log("Chyba při zapínání notifikací:", error);
      return {
        success: false,
        message: `Chyba: ${message}`,
      };
    }
  };

  const disablePushNotifications = async (): Promise<NotificationResult> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        return {
          success: false,
          message: "Nejste přihlášeni k odběru notifikací.",
        };
      }

      const sub = await getCollection({
        collectionSlug: "push-subscriptions",
        query: stringify(
          {
            endpoint: subscription.endpoint,
          },
          {
            encodeValuesOnly: true,
          },
        ),
      });

      if (sub.length === 0) {
        return {
          success: false,
          message: "Nejste přihlášeni k odběru notifikací.",
        };
      }

      const res = await deleteRecord({
        collectionSlug: "push-subscriptions",
        recordId: sub[0].id,
        query: stringify(
          {
            endpoint: subscription.endpoint,
          },
          {
            encodeValuesOnly: true,
          },
        ),
      });

      await subscription.unsubscribe();

      console.log("updated", res);

      return {
        success: true,
        message: "Notifikace byly úspěšně vypnuty!",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Neznámá chyba";
      console.log("Chyba při vypínání notifikací:", error);
      return {
        success: false,
        message: `Chyba: ${message}`,
      };
    }
  };

  return {
    checkBrowserNotifications,
    enablePushNotifications,
    disablePushNotifications,
  };
}
