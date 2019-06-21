import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from '@core/messaging.service';
import { Subscription } from '@core/subscription';
import * as firebase from 'firebase/app';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string;
  sticker: string;
  url = `https://api.giphy.com/v1/stickers/random?api_key=${
    environment.giphyApiKey
  }&limit=1&tag=cat&rating=g`;

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    private http: HttpClient
  ) {
    this.http
      .get(this.url)
      .pipe(pluck('data', 'image_original_url'))
      .subscribe(
        (sticker: string) => (this.sticker = sticker),
        (error) => (this.sticker = environment.defaultSticker)
      );
  }

  ngOnInit() {}

  requestPermission() {
    if (firebase.messaging.isSupported()) {
      this.messagingService
        .requestNotificationPermission(this.name, this.sticker)
        .then(() => {
          this.router.navigateByUrl('/user');
        });
    } else {
      this.messagingService.sendTokenToServer(
        new Subscription(this.name, null, this.sticker)
      );
      this.router.navigateByUrl('/user');
    }
  }
}
