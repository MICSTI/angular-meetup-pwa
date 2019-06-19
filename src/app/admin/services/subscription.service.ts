import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  addSubscription(subscription): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      data: {
        token: subscription.token,
        name: subscription.name,
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

  triggerPushNotification(subscription): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      data: {
        token: subscription.token,
        name: subscription.name,
      },
    };

    return this.http.post(
      environment.apiUrl.sendPushMessage,
      JSON.stringify(body),
      { headers }
    );
  }
}
