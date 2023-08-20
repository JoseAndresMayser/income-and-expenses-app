import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app-state.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user?: User;

  private _userSubscription?: Subscription;

  constructor(private _store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _initialize(): void {
    this._userSubscription = this._store.select('auth')
      .subscribe(auth => {
        const user: User | null = auth.user;
        if (!user) {
          return;
        }
        this.user = user;
      });
  }

  private _finalize(): void {
    this._userSubscription?.unsubscribe();
  }
}
