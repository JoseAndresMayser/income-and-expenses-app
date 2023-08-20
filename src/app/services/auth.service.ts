import {Injectable} from '@angular/core';
import {CreateUserRequest} from "../interfaces/requests/create-user-request.interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {SignInRequest} from "../interfaces/requests/sign-in-request.interface";
import {map, Observable, Subscription} from "rxjs";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../state/app-state.interface";
import {authActions} from "../state/auth/auth.actions";
import {incomeExpenseActions} from "../state/income-expense/income-expense.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?: User;
  private _userSubscription?: Subscription;

  constructor(private _angularFireAuth: AngularFireAuth,
              private _firestore: AngularFirestore,
              private _store: Store<AppState>) {
  }

  public initAuthListener(): void {
    this._angularFireAuth.authState.subscribe(user => {
      if (!user) {
        this._userSubscription?.unsubscribe();
        this._user = undefined;
        this._store.dispatch(authActions.removeUser());
        this._store.dispatch(incomeExpenseActions.removeItems());
        return;
      }
      this._userSubscription = this._firestore.doc(`${user.uid}/users`).valueChanges()
        .subscribe(firestoreUser => {
          const user: User = firestoreUser as User;
          this._user = user;
          this._store.dispatch(authActions.setUser({user}));
        });
    });
  }

  public getUser(): User | undefined {
    return this._user;
  }

  public createUser(request: CreateUserRequest): Promise<void> {
    return this._angularFireAuth.createUserWithEmailAndPassword(request.email, request.password)
      .then(({user}) => {
        if (!user || !user.email) {
          return;
        }
        const newUser: User = new User(user.uid, request.name, user.email);
        return this._firestore.doc(`${user.uid}/users`).set({...newUser});
      });
  }

  public signIn(request: SignInRequest): Promise<UserCredential> {
    return this._angularFireAuth.signInWithEmailAndPassword(request.email, request.password);
  }

  public signOut(): Promise<void> {
    return this._angularFireAuth.signOut();
  }

  public isAuth(): Observable<boolean> {
    return this._angularFireAuth.authState.pipe(
      map(user => !!user)
    );
  }
}
