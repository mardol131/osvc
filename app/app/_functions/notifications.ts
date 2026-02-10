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

export const checkBrowserNotifications =
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
      const subscription = await registrations[0].pushManager.getSubscription();
      console.log("3c. Subscription:", !!subscription);

      const result = subscription ? "enabled" : "supported";
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

export const enablePushNotifications =
  async (): Promise<NotificationResult> => {
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
            "Notifikace byly zamítnuty. Povolte je v nastavení prohlížeče a zkuste znovu.",
        };
      }

      if (permission !== "granted") {
        return {
          success: false,
          message: "Povolení notifikací nebylo uděleno.",
        };
      }

      const registration = await navigator.serviceWorker.register(
        "/notifications-worker.js",
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });

      const p256dh = subscription.getKey("p256dh");
      const auth = subscription.getKey("auth");

      if (!p256dh || !auth) {
        return {
          success: false,
          message: "Chyba při získávání klíčů pro notifikace.",
        };
      }

      const p256dhBase64 = convertArrayBufferToBase64(p256dh);
      const authBase64 = convertArrayBufferToBase64(auth);

      console.log("Push subscription keys obtained:", {
        p256dh: p256dhBase64.substring(0, 20) + "...",
        auth: authBase64.substring(0, 20) + "...",
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/push-subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
            p256dh: p256dhBase64,
            auth: authBase64,
          }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log(response);
        return {
          success: false,
          message: "Chyba při registraci notifikací na serveru.",
        };
      }
      console.log(response);

      return {
        success: true,
        message: "Notifikace byly úspěšně zapnuty!",
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

export const disablePushNotifications =
  async (): Promise<NotificationResult> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        return {
          success: false,
          message: "Nejste přihlášeni k odběru notifikací.",
        };
      }

      await subscription.unsubscribe();

      return {
        success: true,
        message: "Notifikace byly úspěšně vypnuty!",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Neznámá chyba";
      return {
        success: false,
        message: `Chyba: ${message}`,
      };
    }
  };
