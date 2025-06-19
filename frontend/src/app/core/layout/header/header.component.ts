// src/app/core/layout/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  showUserMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
  }
}

// src/app/core/layout/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../../shared/models/user.model';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User | null = null;
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      route: '/dashboard'
    },
    {
      label: 'Clienti',
      icon: 'fas fa-users',
      route: '/clienti'
    },
    {
      label: 'Investimenti',
      icon: 'fas fa-chart-line',
      route: '/investimenti'
    },
    {
      label: 'Polizze',
      icon: 'fas fa-shield-alt',
      route: '/polizze'
    },
    {
      label: 'Supervisione',
      icon: 'fas fa-tasks',
      route: '/supervisione',
      roles: ['SUPERVISORE']
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  canShowMenuItem(item: MenuItem): boolean {
    if (!item.roles) return true;
    return item.roles.includes(this.currentUser?.ruolo || '');
  }
}

// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <div *ngIf="!isAuthPage && isAuthenticated" class="main-layout">
        <app-sidebar></app-sidebar>
        <div class="content-wrapper">
          <app-header></app-header>
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
      <div *ngIf="isAuthPage || !isAuthenticated" class="auth-layout">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isAuthPage = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    // Verifica se siamo in una pagina di autenticazione
    this.isAuthPage = window.location.pathname.includes('/auth');
  }
}
