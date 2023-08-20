import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app-state.interface";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public user?: User;

  private _userSubscription?: Subscription;

  constructor(private _authService: AuthService, private _router: Router, private _store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  public signOut(): void {
    this._authService.signOut().then(() => {
      this._router.navigate(['/login']);
    });
  }

  private _initialize(): void {
    this._userSubscription = this._store.select('auth')
      .subscribe(auth => {
        const user: User | null = auth.user;
        if (!user) {
          return;
        }
        this.user = user;
      })
  }

  private _finalize(): void {
    this._userSubscription?.unsubscribe();
  }
}
