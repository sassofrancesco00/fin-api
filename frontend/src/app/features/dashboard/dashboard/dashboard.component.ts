// src/app/features/dashboard/dashboard.component.ts
import {Component, OnInit} from '@angular/core';
import {NgClass, TitleCasePipe, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';
import { AuthService } from '../../../core/auth/auth.service';

// Interfaces (same as your models)
interface Cliente {
  id?: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  telefono: string;
  email: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  ruoloCode: string;
}

interface NotaInterna {
  id?: number;
  richiestaId?: number;
  polizzaId?: number;
  autoreId: number;
  autore?: User;
  testo: string;
  dataCreazione: Date;
}

interface PolizzaAssicurativa {
  id?: number;
  clienteId: number;
  cliente?: Cliente;
  userId: number;
  user?: User;
  tipoPolizza: 'Vita' | 'Infortuni' | 'RC_Auto' | 'Casa';
  numeroPolizza: string;
  premio: number;
  dataInizio: Date;
  dataScadenza: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  motivazioneRespinta?: string;
  noteInterne?: NotaInterna[];
}

interface RichiestaInvestimento {
  id?: number;
  clienteId: number;
  cliente?: Cliente;
  userId: number;
  user?: User;
  importo: number;
  tipoInvestimento: 'Azioni' | 'Obbligazioni' | 'ETF';
  dataInserimento: Date;
  dataModifica: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  motivazioneRespinta?: string;
  noteInterne?: NotaInterna;
  consulenteId: number;
}

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
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    NgClass,
    RouterModule,
    SidebarComponent
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

  // DATI MOCK - Solo per clienti, richieste e polizze (non più per utenti)
  private readonly mockClienti: Cliente[] = [
    { id: 1, nome: 'Mario', cognome: 'Rossi', codiceFiscale: 'RSSMRA80A01H501X', telefono: '3331234567', email: 'mario.rossi@email.it' },
    { id: 2, nome: 'Giuseppe', cognome: 'Verdi', codiceFiscale: 'VRDGPP75B15F205Y', telefono: '3339876543', email: 'giuseppe.verdi@email.it' },
    { id: 3, nome: 'Maria', cognome: 'Bianchi', codiceFiscale: 'BNCMRA85C20D612Z', telefono: '3335554444', email: 'maria.bianchi@email.it' },
    { id: 4, nome: 'Franco', cognome: 'Neri', codiceFiscale: 'NRIFNC70D10A662W', telefono: '3337778888', email: 'franco.neri@email.it' },
    { id: 5, nome: 'Laura', cognome: 'Gialli', codiceFiscale: 'GLLLRA88E25B345V', telefono: '3332223333', email: 'laura.gialli@email.it' }
  ];

  private readonly mockRichieste: RichiestaInvestimento[] = [
    {
      id: 1,
      clienteId: 2,
      cliente: this.mockClienti.find(c => c.id === 2),
      userId: 1, // Questo verrà aggiornato con l'ID dell'utente reale
      importo: 50000,
      tipoInvestimento: 'ETF',
      dataInserimento: new Date('2025-06-15'),
      dataModifica: new Date('2025-06-15'),
      stato: 'in_revisione',
      consulenteId: 1
    },
    {
      id: 2,
      clienteId: 3,
      cliente: this.mockClienti.find(c => c.id === 3),
      userId: 1,
      importo: 25000,
      tipoInvestimento: 'Azioni',
      dataInserimento: new Date('2025-06-14'),
      dataModifica: new Date('2025-06-14'),
      stato: 'Approvata',
      consulenteId: 1
    },
    {
      id: 3,
      clienteId: 4,
      cliente: this.mockClienti.find(c => c.id === 4),
      userId: 1,
      importo: 75000,
      tipoInvestimento: 'Obbligazioni',
      dataInserimento: new Date('2025-06-13'),
      dataModifica: new Date('2025-06-13'),
      stato: 'Respinta',
      motivazioneRespinta: 'Documentazione incompleta',
      consulenteId: 1
    },
    {
      id: 4,
      clienteId: 1,
      cliente: this.mockClienti.find(c => c.id === 1),
      userId: 1,
      importo: 100000,
      tipoInvestimento: 'ETF',
      dataInserimento: new Date('2025-06-12'),
      dataModifica: new Date('2025-06-12'),
      stato: 'Approvata',
      consulenteId: 1
    }
  ];

  private readonly mockPolizze: PolizzaAssicurativa[] = [
    {
      id: 1,
      clienteId: 5,
      cliente: this.mockClienti.find(c => c.id === 5),
      userId: 1,
      tipoPolizza: 'RC_Auto',
      numeroPolizza: 'AUTO001',
      premio: 1200,
      dataInizio: new Date('2025-01-15'),
      dataScadenza: new Date('2025-12-15'),
      stato: 'Approvata'
    },
    {
      id: 2,
      clienteId: 2,
      cliente: this.mockClienti.find(c => c.id === 2),
      userId: 1,
      tipoPolizza: 'Casa',
      numeroPolizza: 'CASA001',
      premio: 800,
      dataInizio: new Date('2024-07-22'),
      dataScadenza: new Date('2025-07-22'),
      stato: 'Approvata'
    },
    {
      id: 3,
      clienteId: 3,
      cliente: this.mockClienti.find(c => c.id === 3),
      userId: 1,
      tipoPolizza: 'Vita',
      numeroPolizza: 'VITA001',
      premio: 2500,
      dataInizio: new Date('2024-11-10'),
      dataScadenza: new Date('2025-11-10'),
      stato: 'Approvata'
    },
    {
      id: 4,
      clienteId: 1,
      cliente: this.mockClienti.find(c => c.id === 1),
      userId: 1,
      tipoPolizza: 'Infortuni',
      numeroPolizza: 'INF001',
      premio: 450,
      dataInizio: new Date('2025-02-01'),
      dataScadenza: new Date('2025-08-01'),
      stato: 'in_revisione'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadDashboardData();
  }

  private loadCurrentUser(): void {
    // Ottieni l'utente corrente dal service di autenticazione
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      // console.error('Utente non autenticato');
      // Opzionalmente reindirizza al login
      // this.router.navigate(['/login']);
    }
  }

  private loadDashboardData(): void {
    this.loading = true;

    // Simula un delay delle API
    setTimeout(() => {
      // Assicurati che ci sia un utente corrente
      if (this.currentUser) {
        // Aggiorna i dati mock con l'ID dell'utente reale
        this.updateMockDataWithCurrentUser();
      }

      // Calcola le statistiche dai dati mock
      this.stats = {
        totalClienti: this.mockClienti.length,
        richiesteInRevisione: this.mockRichieste.filter(r => r.stato === 'in_revisione').length,
        richiesteApprovate: this.mockRichieste.filter(r => r.stato === 'Approvata').length,
        richiesteRespinte: this.mockRichieste.filter(r => r.stato === 'Respinta').length,
        polizzeInRevisione: this.mockPolizze.filter(p => p.stato === 'in_revisione').length,
        polizzeApprovate: this.mockPolizze.filter(p => p.stato === 'Approvata').length,
        polizzeInScadenza: this.getPolizzeInScadenza().length,
        volumeInvestimentiMese: this.calculateVolumeInvestimenti(this.mockRichieste)
      };

      // Assegna i dati alle proprietà del componente
      this.recentRichieste = this.mockRichieste
        .sort((a, b) => new Date(b.dataInserimento).getTime() - new Date(a.dataInserimento).getTime())
        .slice(0, 5);

      this.recentPolizze = this.mockPolizze
        .sort((a, b) => new Date(b.dataInizio).getTime() - new Date(a.dataInizio).getTime())
        .slice(0, 5);

      this.polizzeInScadenza = this.getPolizzeInScadenza().slice(0, 5);

      this.loading = false;
    }, 1500);
  }

  private updateMockDataWithCurrentUser(): void {
    if (!this.currentUser) return;

    // Aggiorna i dati mock con l'utente reale
    this.mockRichieste.forEach(richiesta => {
      richiesta.user = this.currentUser!;
      richiesta.userId = this.currentUser!.id;
      richiesta.consulenteId = this.currentUser!.id;
    });

    this.mockPolizze.forEach(polizza => {
      polizza.user = this.currentUser!;
      polizza.userId = this.currentUser!.id;
    });
  }

  private getPolizzeInScadenza(): PolizzaAssicurativa[] {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return this.mockPolizze.filter(polizza => {
      const scadenza = new Date(polizza.dataScadenza);
      return scadenza >= today && scadenza <= thirtyDaysFromNow;
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
        return 'bg-warning';
      case 'Approvata':
        return 'bg-success';
      case 'Respinta':
        return 'bg-danger';
      default:
        return 'bg-secondary';
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
    this.loadCurrentUser();
    this.loadDashboardData();
  }

  // Utilizza il metodo del servizio di autenticazione
  isConsulente(): boolean {
    return this.authService.isConsulente();
  }

  // Utilizza il metodo del servizio di autenticazione
  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  sidebarRoutes = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
    { label: 'Clienti', icon: 'fas fa-users', route: '/clienti' },
    { label: 'Investimenti', icon: 'fas fa-chart-line', route: '/investimenti' },
    { label: 'Polizze', icon: 'fas fa-shield-alt', route: '/polizze' }
  ];
}
