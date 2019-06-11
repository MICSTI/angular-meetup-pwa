import { Component } from "@angular/core";

declare var window: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular-meetup-pwa";

  requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    console.log("Notification permission", permission);

    if (permission !== "granted") {
      throw new Error("Permission not granted for Notification");
    }
  };

  showLocalNotification = (title, body, swRegistration) => {
    const options = {
      body
      // here you can add more properties like icon, image, vibrate, etc.
    };
    // TODO we need access to the SW registration object here
    swRegistration.showNotification(title, options);
  };
}
