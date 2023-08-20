import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {take, tap} from "rxjs";

export const authGuard: CanMatchFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.isAuth()
    .pipe(
      tap(state => {
        if (!state) {
          router.navigate(['/login']);
        }
      }),
      take(1)
    );
};
