import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from '@core/subscription';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  subscriptions$: Observable<Subscription[]>;
  defaultSticker: string;

  constructor(private db: AngularFireDatabase) {
    this.defaultSticker = environment.defaultSticker;
    this.subscriptions$ = this.db
      .list<Subscription>('subscriptions')
      .valueChanges();
  }

  ngOnInit() {}
}
