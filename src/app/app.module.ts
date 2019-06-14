import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { MessagingService } from "./services/messaging.service";
import { SubscriptionService } from "./services/subscription.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register("/main-sw.js", {
      enabled: environment.production
    })
  ],
  providers: [MessagingService, SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
