import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class MessagingService {
  private messaging = firebase.messaging();

  private tokenSent = false;

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
        this.messaging
          .getToken()
          .then(currentToken => {
            if (currentToken) {
              this.sendTokenToServer(currentToken);
              this.updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log(
                "No Instance ID token available. Request permission to generate one."
              );
              // Show permission UI.
              this.updateUIForPushPermissionRequired();
              this.tokenSent = false;
            }
          })
          .catch(err => {
            console.log("An error occurred while retrieving token. ", err);
            this.tokenSent = false;
          });

        // Callback fired if Instance ID token is updated.
        this.messaging.onTokenRefresh(() => {
          this.messaging
            .getToken()
            .then(refreshedToken => {
              console.log("Token refreshed.");
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              this.tokenSent = false;
              // Send Instance ID token to app server.
              this.sendTokenToServer(refreshedToken);
              // ...
            })
            .catch(err => {
              console.log("Unable to retrieve refreshed token ", err);
            });
        });
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  }

  private sendTokenToServer(token) {
    // TODO implement
  }

  private updateUIForPushEnabled(token) {
    // TODO implement
  }

  private updateUIForPushPermissionRequired() {
    // TODO implement
  }
}
