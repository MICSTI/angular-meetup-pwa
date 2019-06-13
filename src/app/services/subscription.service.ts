import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public addSubscription(subscription): Observable<any> {
    return this.http.post(environment.apiUrl.getSubscriptions, subscription);
  }

  public getSubscriptions(): Observable<any> {
    return this.http.get(environment.apiUrl.getSubscriptions);
  }

  public clearAllSubscriptions(): Observable<any> {
    return this.http.get(environment.apiUrl.clearAllSubscripts);
  }
}
