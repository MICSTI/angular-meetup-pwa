import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { SubscriptionService } from './services/subscription.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, SharedModule],
  providers: [SubscriptionService],
})
export class AdminModule {}
