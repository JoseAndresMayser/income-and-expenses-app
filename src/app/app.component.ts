import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'income-and-expenses-app';

    constructor(private _authService: AuthService) {
    }

    public ngOnInit(): void {
        this._authService.initAuthListener();
    }
}
