self.addEventListener("push", (event) => {
  console.log("[SW] Push event received");

  let data = {};

  try {
    data = event.data ? event.data.json() : {};
    console.log("[SW] Push data:", data.url);
  } catch (error) {
    console.error("[SW] Error parsing push data:", error);
  }

  const title = data.title || "OSVČ365";
  const options = {
    body: data.body || "Nová notifikace",
    icon: data.icon || "/logo-osvc.png",
    badge: "/logo-osvc.png",
    data: {
      url: data.data.url || "/",
    },
  };

  console.log("[SW] Notification options:", data);
  console.log("[SW] Showing notification:", title, options);

  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .then(() => console.log("[SW] Notification shown successfully"))
      .catch((error) =>
        console.error("[SW] Error showing notification:", error),
      ),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  console.log("[SW] Notification click event:", event);
  console.log("[SW] Notification data:", event.notification);
  console.log("[SW] Notification click event data:", event.notification.data);

  const url = event.notification.data?.url || "/";
  console.log("[SW] Notification click URL:", url);

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes("osvc") && "focus" in client) {
            return client.focus().then((focusedClient) => {
              if (focusedClient && "navigate" in focusedClient) {
                return focusedClient.navigate(url);
              }
            });
          }
        }
        return clients.openWindow(url);
      }),
  );
});
