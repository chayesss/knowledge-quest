import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Redirect root path to /dashboard
    { path: 'dashboard', component: DashboardComponent },
];
