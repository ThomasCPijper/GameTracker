import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ScreenComponent } from '../../core/screen/screen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ScreenComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  auth = inject(AuthService)
  logout() {
    this.auth.logout();
  }
}
