import { Component } from "@angular/core";
import { MessagingService } from "./services/messaging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private messagingService: MessagingService) {}

  public requestPermission() {
    this.messagingService.requestNotificationPermission();
  }
}
