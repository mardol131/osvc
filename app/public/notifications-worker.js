self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {}

  const title = data.title || "OSVČ365";
  const options = {
    body: data.body || "Nová notifikace",
    icon: data.icon || "/logo-osvc.png",
    badge: "/logo-osvc.png",
    data: {
      url: data.data?.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

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
