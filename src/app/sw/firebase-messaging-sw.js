// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");
importScripts("sw-firebase-config.js");

// message listener
self.addEventListener("message", event => {
  console.log("Notification SW received message:", event.data);
});

self.addEventListener("notificationclick", function(event) {
  const rootUrl = new URL("/", location).href;
  event.notification.close();
  // Enumerate windows, and call window.focus(), or open a new one.
  event.waitUntil(
    clients.matchAll().then(matchedClients => {
      for (let client of matchedClients) {
        if (client.url === rootUrl) {
          return client.focus();
        }
      }
      return clients.openWindow("/");
    })
  );
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  console.log("Received background message ", payload);
  // here you can override some options describing what's in the message;
  // however, the actual content will come from the Webtask
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    icon: "/assets/icons/logo-128x128.png"
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
