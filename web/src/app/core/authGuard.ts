import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    map(isAuth => {
      if (isAuth) return true;

      auth.loginWithRedirect({
        authorizationParams: {
          redirect_uri: "http://localhost:4200/dashboard"
        }
      });
      return false;
    })
  );
};