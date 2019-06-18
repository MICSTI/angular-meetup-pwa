import { Component, OnInit } from "@angular/core";
import { SubscriptionService } from "../services/subscription.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {
  subscriptions = [];
  winner = null;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.refreshSubscriptions();
  }

  refreshSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = data;
    });
  }

  selectWinner() {
    this.subscriptionService.getRandomSubscription().subscribe(winner => {
      this.winner = winner;
    });
  }

  sendNotification(subscription) {
    this.subscriptionService
      .triggerPushNotification(subscription)
      .subscribe(res => {
        console.log("push notification triggered");
      });
  }

  deleteSubscriptions() {
    this.subscriptionService.clearAllSubscriptions().subscribe(res => {
      this.subscriptions = [];
    });
  }
}
