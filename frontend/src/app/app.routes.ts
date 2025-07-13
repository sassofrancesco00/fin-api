import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { ClienteFormComponent } from './features/clienti/cliente-form/cliente-form.component';
import { PolizzaListComponent } from './features/polizze/polizza-list/polizza-list.component';
import { PolizzaFormComponent } from './features/polizze/polizza-form/polizza-form.component';
import { RichiestaListComponent } from './features/investimenti/richiesta-list/richiesta-list.component';
import { RichiestaFormComponent } from './features/investimenti/richiesta-form/richiesta-form.component';
import { ClienteListComponent } from './features/clienti/cliente-list/cliente-list.component';
import { WrapperComponent } from './features/wrapper/wrapper.component';

const routes: Routes = [

  // AUTHENTICATION
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // DASHBOARD
  {
    path: 'dashboard',
    component: WrapperComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'clienti', component: ClienteListComponent },
      { path: 'clienti/view/:id', component: ClienteFormComponent },
      { path: 'clienti/nuovo', component: ClienteFormComponent },
      { path: 'clienti/edit/:id', component: ClienteFormComponent },

      { path: 'investimenti', component: RichiestaListComponent },

      { path: 'polizze', component: PolizzaListComponent },

    ]
  },

  // GESTIONE CLIENTI
  // { path: 'clienti', component: ClienteListComponent },


  // GESTIONE POLIZZE
  { path: 'polizze', component: PolizzaListComponent },
  { path: 'polizze/lista', component: PolizzaListComponent, canActivate: [AuthGuard] },
  { path: 'polizze/nuova', component: PolizzaFormComponent, canActivate: [AuthGuard] },
  { path: 'polizze/modifica/:id', component: PolizzaFormComponent, canActivate: [AuthGuard] },
  { path: 'polizze/dettaglio/:id', component: PolizzaFormComponent, canActivate: [AuthGuard] },

  // GESTIONE INVESTIMENTI
  { path: 'investimenti', component: RichiestaListComponent },
  { path: 'investimenti/richieste', component: RichiestaListComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/nuova-richiesta', component: RichiestaFormComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/modifica-richiesta/:id', component: RichiestaFormComponent, canActivate: [AuthGuard] },
  { path: 'investimenti/dettaglio-richiesta/:id', component: RichiestaFormComponent, canActivate: [AuthGuard] },

  // WILDCARD - deve essere sempre l'ultima rotta
  // {path: '**', redirectTo: '/dashboard'}
];

export { routes };
