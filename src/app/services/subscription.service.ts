import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Subscription } from "../model/Subscription";

@Injectable({
  providedIn: "root"
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public addSubscription(subscription): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    const body = {
      data: {
        token: subscription.token,
        name: subscription.name
      }
    };

    return this.http.post(
      environment.apiUrl.addSubscription,
      JSON.stringify(body),
      {
        headers
      }
    );
  }

  public getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(environment.apiUrl.getSubscriptions);
  }

  public clearAllSubscriptions(): Observable<any> {
    return this.http.get(environment.apiUrl.clearAllSubscripts);
  }

  public triggerPushNotification(subscription): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    const body = {
      data: {
        token: subscription.token,
        name: subscription.name
      }
    };

    return this.http.post(
      environment.apiUrl.sendPushMessage,
      JSON.stringify(body),
      { headers }
    );
  }
}
