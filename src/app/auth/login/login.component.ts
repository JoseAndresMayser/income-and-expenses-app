import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignInRequest} from "../../interfaces/requests/sign-in-request.interface";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import SweetAlert from 'sweetalert2';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app-state.interface";
import {uiActions} from "../../state/ui/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginFormGroup?: FormGroup;
  public isLoading: boolean;

  private _uiSubscription?: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _store: Store<AppState>) {
    this.isLoading = false;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  public signIn(): void {
    if (!this.loginFormGroup || this.loginFormGroup.invalid) {
      return;
    }
    this._store.dispatch(uiActions.startLoading());

    // SweetAlert.fire({
    //     title: 'Login in progress!',
    //     didOpen: () => {
    //         SweetAlert.showLoading()
    //     }
    // });

    const {email, password} = this.loginFormGroup.value;
    const request: SignInRequest = {
      email,
      password
    };
    this._authService.signIn(request)
      .then(() => {
        // SweetAlert.close();
        this._store.dispatch(uiActions.stopLoading());
        this._router.navigate(['/']);
      })
      .catch(error => {
        this._store.dispatch(uiActions.stopLoading());
        SweetAlert.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });
  }

  private _initialize(): void {
    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this._uiSubscription = this._store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  private _finalize(): void {
    this._uiSubscription?.unsubscribe();
  }
}
