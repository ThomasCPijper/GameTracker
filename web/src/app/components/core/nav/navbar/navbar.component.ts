import { Component } from '@angular/core';
import { NavbuttonComponent } from '../navbutton/navbutton.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavbuttonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
