import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { ClienteListComponent } from './features/clienti/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/clienti/cliente-form/cliente-form.component';
import { PolizzaListComponent } from './features/polizze/polizza-list/polizza-list.component';
import { PolizzaFormComponent } from './features/polizze/polizza-form/polizza-form.component';
import { RichiestaListComponent } from './features/investimenti/richiesta-list/richiesta-list.component';
import { RichiestaFormComponent } from './features/investimenti/richiesta-form/richiesta-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // AUTHENTICATION
  { path: 'login', component: LoginComponent },

  // DASHBOARD
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // GESTIONE CLIENTI
  { path: 'clienti', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'clienti/lista', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'clienti/nuovo', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'clienti/modifica/:id', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'clienti/dettaglio/:id', component: ClienteFormComponent, canActivate: [AuthGuard] },

  // GESTIONE POLIZZE
  { path: 'polizze', component: PolizzaListComponent, canActivate: [AuthGuard] },
  { path: 'polizze/lista', component: PolizzaListComponent, canActivate: [AuthGuard] },
  { path: 'polizze/nuova', component: PolizzaFormComponent, canActivate: [AuthGuard] },
  { path: 'polizze/modifica/:id', component: PolizzaFormComponent, canActivate: [AuthGuard] },
  { path: 'polizze/dettaglio/:id', component: PolizzaFormComponent, canActivate: [AuthGuard] },

  // GESTIONE INVESTIMENTI
  { path: 'investimenti', component: RichiestaListComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/richieste', component: RichiestaListComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/nuova-richiesta', component: RichiestaFormComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/modifica-richiesta/:id', component: RichiestaFormComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/dettaglio-richiesta/:id', component: RichiestaFormComponent, canActivate: [AuthGuard] },

  // WILDCARD - deve essere sempre l'ultima rotta
  { path: '**', redirectTo: '/dashboard' }
];

export { routes };
