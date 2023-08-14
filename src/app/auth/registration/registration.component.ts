import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CreateUserRequest} from "../../interfaces/requests/create-user-request.interface";
import {Router} from "@angular/router";
import SweetAlert from 'sweetalert2';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    public registrationFormGroup?: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _router: Router) {
    }

    public ngOnInit(): void {
        this.registrationFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    public createUser(): void {
        if (!this.registrationFormGroup || this.registrationFormGroup.invalid) {
            return;
        }

        SweetAlert.fire({
            title: 'Registration in progress!',
            didOpen: () => {
                SweetAlert.showLoading()
            }
        });

        const {name, email, password} = this.registrationFormGroup.value;
        const request: CreateUserRequest = {
            name,
            email,
            password
        };
        this._authService.createUser(request)
            .then(() => {
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
