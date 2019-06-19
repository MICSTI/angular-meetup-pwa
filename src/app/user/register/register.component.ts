import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@core/messaging.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string;

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {}

  public registerButtonEnabled() {
    return this.name && this.name.trim() !== '';
  }

  public requestPermission() {
    this.messagingService.requestNotificationPermission(this.name);
  }
}
