import {Injectable} from '@angular/core';
import {CreateUserRequest} from "../interfaces/requests/create-user-request.interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {SignInRequest} from "../interfaces/requests/sign-in-request.interface";
import {map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _angularFireAuth: AngularFireAuth,
                private _firestore: AngularFirestore) {
    }

    public initAuthListener(): void {
        this._angularFireAuth.authState.subscribe(user => {
            console.log(user);
        });
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
