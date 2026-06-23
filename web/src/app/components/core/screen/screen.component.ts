import { booleanAttribute, Component, Input } from '@angular/core';
import { NavbarComponent } from '../nav/navbar/navbar.component';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
  @Input({ transform: booleanAttribute })
  navbar = true;
}
