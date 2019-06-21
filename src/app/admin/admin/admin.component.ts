import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '@core/subscription.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  subscriptions = [];
  winner = null;
  winnerRevealed = false;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.refreshSubscriptions();
  }

  refreshSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe((data) => {
      this.subscriptions = data;
    });
  }

  selectWinner() {
    this.subscriptionService
      .getRandomSubscription()
      .subscribe((winner) => {
        this.winner = winner;

        this.sendWinningNotification(this.winner);
      });
  }

  revealWinner() {
    this.winnerRevealed = true;
  }

  sendWinningNotification(subscription) {
    this.subscriptionService
      .sendWinningMessage(subscription)
      .subscribe((res) => {
        console.log('winning message sent');
      });
  }

  sendNotification(subscription) {
    this.subscriptionService
      .sendHelloMessage(subscription)
      .subscribe((res) => {
        console.log('push notification triggered');
      });
  }

  deleteSubscriptions() {
    this.subscriptionService
      .clearAllSubscriptions()
      .subscribe((res) => {
        this.subscriptions = [];
      });
  }
}
