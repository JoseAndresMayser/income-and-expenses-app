import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  public signOut(): void {
    this._authService.signOut().then(() => {
      this._router.navigate(['/login']);
    });
  }
}
