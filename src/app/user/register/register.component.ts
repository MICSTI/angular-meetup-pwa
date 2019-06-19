import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from '@core/messaging.service';
import { throwError } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string;
  sticker: string;
  url = `http://api.giphy.com/v1/stickers/random?api_key=${
    environment.giphyApiKey
  }&limit=1&tag=cat&rating=g`;
  backupUrl =
    'https://media.giphy.com/media/1iu8uG2cjYFZS6wTxv/giphy.gif';

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    private http: HttpClient
  ) {
    this.http
      .get(this.url)
      .pipe(
        pluck('data', 'image_original_url'),
        tap((_) => {
          throwError(new Error('ERROR'));
          console.log('TESTEST');
        })
      )
      .subscribe(
        (sticker: string) => (this.sticker = sticker),
        (error) => (this.sticker = this.backupUrl)
      );
  }

  ngOnInit() {}

  requestPermission() {
    this.messagingService
      .requestNotificationPermission(this.name, this.sticker)
      .then(() => {
        this.router.navigateByUrl('/user');
      });
  }
}
