// src/app/features/dashboard/dashboard.component.ts
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {RichiestaInvestimentoService} from '../../shared/services/richiesta-investimento.service';
import {PolizzaService} from '../../shared/services/polizza.service';
import {ClienteService} from '../../shared/services/cliente.service';
import {User} from '../../shared/models/user.model';
import {RichiestaInvestimento} from '../../shared/models/richiesta-investimento.model';
import {PolizzaAssicurativa} from '../../shared/models/polizza.model';
import {forkJoin} from 'rxjs';

interface DashboardStats {
  totalClienti: number;
  richiesteInRevisione: number;
  richiesteApprovate: number;
  richiesteRespinte: number;
  polizzeInRevisione: number;
  polizzeApprovate: number;
  polizzeInScadenza: number;
  volumeInvestimentiMese: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: DashboardStats = {
    totalClienti: 0,
    richiesteInRevisione: 0,
    richiesteApprovate: 0,
    richiesteRespinte: 0,
    polizzeInRevisione: 0,
    polizzeApprovate: 0,
    polizzeInScadenza: 0,
    volumeInvestimentiMese: 0
  };

  recentRichieste: RichiestaInvestimento[] = [];
  recentPolizze: PolizzaAssicurativa[] = [];
  polizzeInScadenza: PolizzaAssicurativa[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private richiestaService: RichiestaInvestimentoService,
    private polizzaService: PolizzaService,
    private clienteService: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;

    const filters = this.authService.isConsulente() ?
      {userId: this.currentUser?.id} : {};

    const requests = [
      this.clienteService.getClienti(0, 1),
      this.richiestaService.getRichieste(0, 5, filters),
      this.richiestaService.getRichieste(0, 1, {...filters, stato: 'in_revisione'}),
      this.richiestaService.getRichieste(0, 1, {...filters, stato: 'Approvata'}),
      this.richiestaService.getRichieste(0, 1, {...filters, stato: 'Respinta'}),
      this.polizzaService.getPolizze(0, 5, filters),
      this.polizzaService.getPolizze(0, 1, {...filters, stato: 'in_revisione'}),
      this.polizzaService.getPolizze(0, 1, {...filters, stato: 'Approvata'}),
      this.polizzaService.getPolizzeInScadenza(30)
    ];

    forkJoin(requests).subscribe({
      next: ([
               clientiResponse,
               richiesteResponse,
               richiesteInRevisioneResponse,
               richiesteApprovateResponse,
               richiesteRespinteResponse,
               polizzeResponse,
               polizzeInRevisioneResponse,
               polizzeApprovateResponse,
               polizzeInScadenzaResponse
             ]) => {
        this.stats = {
          totalClienti: clientiResponse.totalElements,
          richiesteInRevisione: richiesteInRevisioneResponse.totalElements,
          richiesteApprovate: richiesteApprovateResponse.totalElements,
          richiesteRespinte: richiesteRespinteResponse.totalElements,
          polizzeInRevisione: polizzeInRevisioneResponse.totalElements,
          polizzeApprovate: polizzeApprovateResponse.totalElements,
          polizzeInScadenza: polizzeInScadenzaResponse.length,
          volumeInvestimentiMese: this.calculateVolumeInvestimenti(richiesteResponse.content)
        };

        this.recentRichieste = richiesteResponse.content.slice(0, 5);
        this.recentPolizze = polizzeResponse.content.slice(0, 5);
        this.polizzeInScadenza = polizzeInScadenzaResponse.slice(0, 5);

        this.loading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento dati dashboard:', error);
        this.loading = false;
      }
    });
  }

  private calculateVolumeInvestimenti(richieste: RichiestaInvestimento[]): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return richieste
      .filter(r => {
        const dataRichiesta = new Date(r.dataInserimento);
        return dataRichiesta.getMonth() === currentMonth &&
          dataRichiesta.getFullYear() === currentYear &&
          r.stato === 'Approvata';
      })
      .reduce((total, r) => total + r.importo, 0);
  }

  getStatoClass(stato: string): string {
    switch (stato) {
      case 'in_revisione':
        return 'badge bg-warning';
      case 'Approvata':
        return 'badge bg-success';
      case 'Respinta':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('it-IT');
  }

  refreshDashboard(): void {
    this.loadDashboardData();
  }
}
