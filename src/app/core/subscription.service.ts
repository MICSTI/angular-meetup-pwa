import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from './subscription';

@Injectable()
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  addSubscription(subscription: Subscription): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      data: {
        token: subscription.token,
        name: subscription.name,
        sticker: subscription.sticker,
      },
    };

    return this.http.post(
      environment.apiUrl.addSubscription,
      JSON.stringify(body),
      {
        headers,
      }
    );
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(
      environment.apiUrl.getSubscriptions
    );
  }

  clearAllSubscriptions(): Observable<any> {
    return this.http.delete(environment.apiUrl.clearAllSubscriptions);
  }

  getRandomSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(
      environment.apiUrl.getRandomSubscription
    );
  }

  triggerPushNotification(
    subscription: { token: any },
    data = { title: 'Default title', body: 'Default body' }
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      data: {
        token: subscription.token,
        title: data.title,
        body: data.body,
      },
    };

    return this.http.post(
      environment.apiUrl.sendPushMessage,
      JSON.stringify(body),
      { headers }
    );
  }

  sendWinningMessage(subscription: Subscription): Observable<any> {
    const data = {
      title: '🏆 Congratulations 🎉',
      body: `You are the winner, ${subscription.name}!`,
    };

    return this.triggerPushNotification(subscription, data);
  }

  sendHelloMessage(
    subscription: { token: any },
    senderName: string = 'A user'
  ): Observable<any> {
    const data = {
      title: `🚀 New notification 🎉`,
      body: `${senderName} says hi 😊`,
    };

    return this.triggerPushNotification(subscription, data);
  }
}
