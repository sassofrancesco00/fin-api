import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface SidebarRoute {
  label: string;
  icon?: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    // altri import se necessari
  ],
})
export class SidebarComponent {
  @Input() routes: SidebarRoute[] = [];

  constructor(public router: Router) {}

  // Puoi aggiungere qui la logica per i ruoli se necessario
  canShow(item: SidebarRoute): boolean {
    // Esempio: mostra tutto, oppure filtra per ruolo
    return true;
  }
}
