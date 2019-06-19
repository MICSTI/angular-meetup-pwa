import { Injectable } from '@angular/core';
import '@firebase/messaging';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Subscription } from './subscription';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class MessagingService {
  private messaging = null;
  private notificationToken = null;

  constructor(private subscriptionService: SubscriptionService) {
    const firebaseConfig = environment.firebase || {};
    firebase.initializeApp(firebaseConfig);

    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey(
      'BPuhdyzFmNexAkV0yjYVbyE4EFz89OBcRWZpzOAbBYsQbIpkdgv0UVuvOoSGk79XPyr_4l0GusCC96L-0aiaEmY'
    );
  }

  requestNotificationPermission(
    name: string,
    sticker: string
  ): Promise<any> {
    return Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        this.messaging
          .getToken()
          .then((currentToken: any) => {
            if (currentToken) {
              this.notificationToken = currentToken;
              this.sendTokenToServer({
                token: currentToken,
                name,
                sticker,
              });
              this.updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log(
                'No Instance ID token available. Request permission to generate one.'
              );
              // Show permission UI.
              this.updateUIForPushPermissionRequired();
            }
          })
          .catch((err: any) => {
            console.log(
              'An error occurred while retrieving token. ',
              err
            );
          });

        // Callback fired if Instance ID token is updated.
        this.messaging.onTokenRefresh(() => {
          this.messaging
            .getToken()
            .then((refreshedToken: any) => {
              this.notificationToken = refreshedToken;
              console.log('Token refreshed.');
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              // Send Instance ID token to app server.
              this.sendTokenToServer({
                token: refreshedToken,
                name,
                sticker,
              });
              // ...
            })
            .catch((err: any) => {
              console.log('Unable to retrieve refreshed token ', err);
            });
        });
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  private sendTokenToServer(subscription: Subscription) {
    this.subscriptionService
      .addSubscription(subscription)
      .subscribe((res) => {
        console.log('token successfully sent to server');
      });
  }

  private updateUIForPushEnabled(token: any) {
    // TODO implement
  }

  private updateUIForPushPermissionRequired() {
    // TODO implement
  }
}
