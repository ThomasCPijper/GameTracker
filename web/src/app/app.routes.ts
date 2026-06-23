import { Routes } from '@angular/router';
import { DashboardComponent } from './components/routes/dashboard/dashboard.component';
import { authGuard } from './core/authGuard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'games',
    component: DashboardComponent,
    canActivate: [authGuard]
  }
];
