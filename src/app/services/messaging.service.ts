import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

@Injectable
export class MessagingService {
  private messaging = firebase.messaging.Messaging;

  constructor() {
    this.messaging.usePublicVapidKey(
      "BPuhdyzFmNexAkV0yjYVbyE4EFz89OBcRWZpzOAbBYsQbIpkdgv0UVuvOoSGk79XPyr_4l0GusCC96L-0aiaEmY"
    );
  }

  public requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging
          .getToken()
          .then(currentToken => {
            if (currentToken) {
              sendTokenToServer(currentToken);
              updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log(
                "No Instance ID token available. Request permission to generate one."
              );
              // Show permission UI.
              updateUIForPushPermissionRequired();
              setTokenSentToServer(false);
            }
          })
          .catch(err => {
            console.log("An error occurred while retrieving token. ", err);
            showToken("Error retrieving Instance ID token. ", err);
            setTokenSentToServer(false);
          });

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
          messaging
            .getToken()
            .then(refreshedToken => {
              console.log("Token refreshed.");
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              setTokenSentToServer(false);
              // Send Instance ID token to app server.
              sendTokenToServer(refreshedToken);
              // ...
            })
            .catch(err => {
              console.log("Unable to retrieve refreshed token ", err);
              showToken("Unable to retrieve refreshed token ", err);
            });
        });
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  }
}
