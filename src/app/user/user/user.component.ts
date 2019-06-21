import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from '@core/subscription';
import { SubscriptionService } from '@core/subscription.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagingService } from '@core/messaging.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  subscriptions$: Observable<Subscription[]>;
  defaultSticker: string;

  constructor(
    private db: AngularFireDatabase,
    private subscriptionService: SubscriptionService,
    private messagingService: MessagingService
  ) {
    this.defaultSticker = environment.defaultSticker;
    this.subscriptions$ = this.db
      .list<Subscription>('subscriptions')
      .valueChanges();
  }

  ngOnInit() {}

  sendHelloMessage(subscription: Subscription) {
    const name = this.messagingService.getUserName() || 'A user';
    this.subscriptionService
      .sendHelloMessage(subscription, name)
      .subscribe((res) => {
        console.log(`said hello to ${subscription.name}`);
      });
  }
}
