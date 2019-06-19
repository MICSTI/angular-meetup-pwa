import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagingService } from './messaging.service';
import { SubscriptionService } from './subscription.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [MessagingService, SubscriptionService],
})
export class CoreModule {}
