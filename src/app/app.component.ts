import { Component } from "@angular/core";
import { MessagingService } from "./services/messaging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name: string;

  constructor(private messagingService: MessagingService) {}

  public registerButtonEnabled() {
    return this.name && this.name.trim() !== "";
  }

  public requestPermission() {
    this.messagingService.requestNotificationPermission();
  }
}
