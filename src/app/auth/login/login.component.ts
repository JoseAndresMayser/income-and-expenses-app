import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignInRequest} from "../../interfaces/requests/sign-in-request.interface";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import SweetAlert from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginFormGroup?: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _router: Router) {
    }

    public ngOnInit(): void {
        this.loginFormGroup = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    public signIn(): void {
        if (!this.loginFormGroup || this.loginFormGroup.invalid) {
            return;
        }

        SweetAlert.fire({
            title: 'Login in progress!',
            didOpen: () => {
                SweetAlert.showLoading()
            }
        });

        const {email, password} = this.loginFormGroup.value;
        const request: SignInRequest = {
            email,
            password
        };
        this._authService.signIn(request)
            .then(response => {
                console.log(response);
                SweetAlert.close();
                this._router.navigate(['/']);
            })
            .catch(error => {
                SweetAlert.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message
                });
            });
    }
}
