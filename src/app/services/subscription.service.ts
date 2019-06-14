import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public addSubscription(subscriptionToken): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    const body = {
      data: {
        token: subscriptionToken
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

  public getSubscriptions(): Observable<any> {
    return this.http.get(environment.apiUrl.getSubscriptions);
  }

  public clearAllSubscriptions(): Observable<any> {
    return this.http.get(environment.apiUrl.clearAllSubscripts);
  }

  public triggerPushNotification(token): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    const body = {
      data: {
        token
      }
    };

    return this.http.post(
      environment.apiUrl.sendPushMessage,
      JSON.stringify(body),
      { headers }
    );
  }
}
