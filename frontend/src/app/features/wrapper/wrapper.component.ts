import { Component } from '@angular/core';
import { SidebarComponent } from "../../core/layout/sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard/dashboard.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  imports: [SidebarComponent, DashboardComponent,RouterModule]
})
export class WrapperComponent {
  sidebarRoutes = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
    { label: 'Clienti', icon: 'fas fa-users', route: '/dashboard/clienti' },
    { label: 'Investimenti', icon: 'fas fa-chart-line', route: '/dashboard/investimenti' },
    { label: 'Polizze', icon: 'fas fa-shield-alt', route: '/dashboard/polizze' }
  ];
}
