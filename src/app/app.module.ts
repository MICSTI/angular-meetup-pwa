import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { MessagingService } from "./services/messaging.service";
import { SubscriptionService } from "./services/subscription.service";
import { BoardComponent } from "./board/board.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./notfound/notfound.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    ServiceWorkerModule.register("/main-sw.js", {
      enabled: environment.production
    })
  ],
  providers: [MessagingService, SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
