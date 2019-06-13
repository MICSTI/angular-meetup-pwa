// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import { environment } from "../environments/environment";

const firebaseConfig = environment.firebase || {};

// message listener
self.addEventListener("message", event => {
  console.log("Notification SW received message:", event.data);
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  console.log("Received background message ", payload);
  // here you can override some options describing what's in the message;
  // however, the actual content will come from the Webtask
  const notificationOptions = {
    icon: "/assets/images/logo-128.png"
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
