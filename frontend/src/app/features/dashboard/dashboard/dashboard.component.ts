// src/app/features/dashboard/dashboard.component.ts
import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {RichiestaInvestimento} from '../../../shared/models/richiesta-investimento';
import {PolizzaAssicurativa} from '../../../shared/models/polizza';
import {AuthService} from '../../../core/auth/auth.service';
import {RichiestaInvestimentoService} from '../../../shared/services/richiesta-investimento.service';
import {PolizzaService} from '../../../shared/services/polizza.service';
import {ClienteService} from '../../../shared/services/cliente.service';
import {TitleCasePipe} from '@angular/common';
import {User} from '../../../shared/models/user';
import {PaginatedResponse} from '../../../shared/models/api-response';
import {Cliente} from '../../../shared/models/cliente';

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
  imports: [
    TitleCasePipe
  ],
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

  // Type guard per verificare se la risposta è paginata
  private isPaginatedResponse<T>(response: any): response is PaginatedResponse<T> {
    return response && typeof response === 'object' && 'content' in response && 'totalElements' in response;
  }

  // Type guard per verificare se la risposta è un array
  private isArrayResponse<T>(response: any): response is T[] {
    return Array.isArray(response);
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

        // Gestione sicura delle risposte con type checking
        const totalClienti = this.isPaginatedResponse<Cliente>(clientiResponse) ?
          clientiResponse.totalElements : 0;

        const richiesteInRevisione = this.isPaginatedResponse<RichiestaInvestimento>(richiesteInRevisioneResponse) ?
          richiesteInRevisioneResponse.totalElements : 0;

        const richiesteApprovate = this.isPaginatedResponse<RichiestaInvestimento>(richiesteApprovateResponse) ?
          richiesteApprovateResponse.totalElements : 0;

        const richiesteRespinte = this.isPaginatedResponse<RichiestaInvestimento>(richiesteRespinteResponse) ?
          richiesteRespinteResponse.totalElements : 0;

        const polizzeInRevisione = this.isPaginatedResponse<PolizzaAssicurativa>(polizzeInRevisioneResponse) ?
          polizzeInRevisioneResponse.totalElements : 0;

        const polizzeApprovate = this.isPaginatedResponse<PolizzaAssicurativa>(polizzeApprovateResponse) ?
          polizzeApprovateResponse.totalElements : 0;

        const polizzeInScadenzaCount = this.isArrayResponse<PolizzaAssicurativa>(polizzeInScadenzaResponse) ?
          polizzeInScadenzaResponse.length :
          (this.isPaginatedResponse<PolizzaAssicurativa>(polizzeInScadenzaResponse) ?
            polizzeInScadenzaResponse.totalElements : 0);

        // Estrazione del contenuto per i calcoli
        const richiesteContent = this.isPaginatedResponse<RichiestaInvestimento>(richiesteResponse) ?
          richiesteResponse.content :
          (this.isArrayResponse<RichiestaInvestimento>(richiesteResponse) ? richiesteResponse : []);

        const polizzeContent = this.isPaginatedResponse<PolizzaAssicurativa>(polizzeResponse) ?
          polizzeResponse.content :
          (this.isArrayResponse<PolizzaAssicurativa>(polizzeResponse) ? polizzeResponse : []);

        const polizzeInScadenzaContent = this.isArrayResponse<PolizzaAssicurativa>(polizzeInScadenzaResponse) ?
          polizzeInScadenzaResponse :
          (this.isPaginatedResponse<PolizzaAssicurativa>(polizzeInScadenzaResponse) ?
            polizzeInScadenzaResponse.content : []);

        this.stats = {
          totalClienti,
          richiesteInRevisione,
          richiesteApprovate,
          richiesteRespinte,
          polizzeInRevisione,
          polizzeApprovate,
          polizzeInScadenza: polizzeInScadenzaCount,
          volumeInvestimentiMese: this.calculateVolumeInvestimenti(richiesteContent)
        };

        this.recentRichieste = richiesteContent.slice(0, 5);
        this.recentPolizze = polizzeContent.slice(0, 5);
        this.polizzeInScadenza = polizzeInScadenzaContent.slice(0, 5);

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
