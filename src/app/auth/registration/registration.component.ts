import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CreateUserRequest} from "../../interfaces/requests/create-user-request.interface";
import {Router} from "@angular/router";
import SweetAlert from 'sweetalert2';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app-state.interface";
import {uiActions} from "../../state/ui/ui.actions";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationFormGroup?: FormGroup;
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

  public createUser(): void {
    if (!this.registrationFormGroup || this.registrationFormGroup.invalid) {
      return;
    }
    this._store.dispatch(uiActions.startLoading());

    // SweetAlert.fire({
    //     title: 'Registration in progress!',
    //     didOpen: () => {
    //         SweetAlert.showLoading()
    //     }
    // });

    const {name, email, password} = this.registrationFormGroup.value;
    const request: CreateUserRequest = {
      name,
      email,
      password
    };
    this._authService.createUser(request)
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
    this.registrationFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
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
