import { Component } from '@angular/core';
import { ScreenComponent } from '../../core/screen/screen.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
