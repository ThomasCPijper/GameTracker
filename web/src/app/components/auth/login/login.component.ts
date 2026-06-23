import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService);

  login() {
    this.auth.loginWithPopup();
  }

  signup() {
    this.auth.loginWithPopup({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  }
}
