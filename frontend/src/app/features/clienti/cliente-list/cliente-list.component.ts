import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { ClienteService } from '../../../shared/services/cliente.service';
import { Cliente } from '../../../shared/models/cliente';
import { RichiestaInvestimento } from '../../../shared/models/richiesta-investimento';
import { PolizzaAssicurativa } from '../../../shared/models/polizza';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data properties
  clienti: Cliente[] = [];
  filteredClienti: Cliente[] = [];
  paginatedClienti: Cliente[] = [];

  // Related entities
  richieste: RichiestaInvestimento[] = [];
  polizze: PolizzaAssicurativa[] = [];

  // UI State
  loading = true;
  error: string | null = null;

  // Filter and Search
  searchTerm = '';
  sortBy = 'nome';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  // Selection
  selectedClienti: number[] = [];
  selectAll = false;

  // Stats
  totalClienti = 0;
  clientiAttivi = 0;
  clientiConInvestimenti = 0;
  clientiConPolizze = 0;

  // Sidebar routes
  sidebarRoutes = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
    { label: 'Clienti', icon: 'fas fa-users', route: '/clienti', active: true },
    { label: 'Investimenti', icon: 'fas fa-chart-line', route: '/investimenti' },
    { label: 'Polizze', icon: 'fas fa-shield-alt', route: '/polizze' }
  ];

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.loading = true;
    this.error = null;

    // Carica tutti i dati contemporaneamente
    forkJoin({
      clienti: this.clienteService.getAllClienti(),
      richieste: this.clienteService.getAllRichiesteInvestimento(),
      polizze: this.clienteService.getAllPolizze(),
      stats: this.clienteService.getClientiStats()
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.clienti = data.clienti;
        this.richieste = data.richieste;
        this.polizze = data.polizze;
        
        // Aggiorna le statistiche
        this.totalClienti = data.stats.totalClienti;
        this.clientiAttivi = data.stats.clientiAttivi;
        this.clientiConInvestimenti = data.stats.clientiConInvestimenti;
        this.clientiConPolizze = data.stats.clientiConPolizze;

        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento dei dati:', error);
        this.error = 'Errore nel caricamento dei dati. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  // Filter and Search methods
  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.sortBy = 'nome';
    this.sortOrder = 'asc';
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    // Apply search filter
    this.filteredClienti = this.clienti.filter(cliente => {
      const searchLower = this.searchTerm.toLowerCase();
      return (
        cliente.nome.toLowerCase().includes(searchLower) ||
        cliente.cognome.toLowerCase().includes(searchLower) ||
        cliente.email.toLowerCase().includes(searchLower) ||
        cliente.telefono.includes(searchLower) ||
        cliente.codiceFiscale.toLowerCase().includes(searchLower)
      );
    });

    // Apply sorting
    this.filteredClienti.sort((a, b) => {
      let aValue = a[this.sortBy as keyof Cliente] as string;
      let bValue = b[this.sortBy as keyof Cliente] as string;

      if (this.sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    // Update pagination
    this.updatePagination();
  }

  // Pagination methods
  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClienti.length / this.itemsPerPage);

    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClienti = this.filteredClienti.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Selection methods
  onSelectAll(): void {
    if (this.selectAll) {
      this.selectedClienti = this.paginatedClienti.map(c => c.id!);
    } else {
      this.selectedClienti = [];
    }
  }

  onClienteSelect(clienteId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!this.selectedClienti.includes(clienteId)) {
        this.selectedClienti.push(clienteId);
      }
    } else {
      this.selectedClienti = this.selectedClienti.filter(id => id !== clienteId);
    }

    this.selectAll = this.selectedClienti.length === this.paginatedClienti.length;
  }

  // Helper methods for related data
  getClienteInvestimenti(clienteId: number): RichiestaInvestimento[] {
    return this.richieste.filter(r => r.richiesta.cliente.id === clienteId);
  }

  getClientePolizze(clienteId: number): PolizzaAssicurativa[] {
    return this.polizze.filter(p => p.clienteId === clienteId);
  }

  // Action methods
  openAddClienteModal(): void {
    this.router.navigate(['/clienti/nuovo']);
  }

  viewCliente(cliente: Cliente): void {
    this.router.navigate(['/clienti', cliente.id]);
  }

  editCliente(cliente: Cliente): void {
    this.router.navigate(['/clienti', cliente.id, 'edit']);
  }

  deleteCliente(cliente: Cliente): void {
    if (confirm(`Sei sicuro di voler eliminare il cliente ${cliente.nome} ${cliente.cognome}?`)) {
      this.clienteService.deleteCliente(cliente.id!).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.clienti = this.clienti.filter(c => c.id !== cliente.id);
          this.selectedClienti = this.selectedClienti.filter(id => id !== cliente.id);
          this.applyFilters();
          this.updateStats();
          alert('Cliente eliminato con successo!');
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione del cliente:', error);
          alert('Errore nell\'eliminazione del cliente. Riprova più tardi.');
        }
      });
    }
  }

  deleteSelected(): void {
    if (this.selectedClienti.length === 0) return;

    if (confirm(`Sei sicuro di voler eliminare ${this.selectedClienti.length} clienti selezionati?`)) {
      const deleteObservables = this.selectedClienti.map(id => 
        this.clienteService.deleteCliente(id)
      );

      forkJoin(deleteObservables).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.clienti = this.clienti.filter(c => !this.selectedClienti.includes(c.id!));
          this.selectedClienti = [];
          this.selectAll = false;
          this.applyFilters();
          this.updateStats();
          alert('Clienti eliminati con successo!');
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione dei clienti:', error);
          alert('Errore nell\'eliminazione dei clienti. Riprova più tardi.');
        }
      });
    }
  }

  private updateStats(): void {
    this.clienteService.getClientiStats().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (stats) => {
        this.totalClienti = stats.totalClienti;
        this.clientiAttivi = stats.clientiAttivi;
        this.clientiConInvestimenti = stats.clientiConInvestimenti;
        this.clientiConPolizze = stats.clientiConPolizze;
      },
      error: (error) => {
        console.error('Errore nell\'aggiornamento delle statistiche:', error);
      }
    });
  }

  exportSelected(): void {
    const clientiToExport = this.clienti.filter(c => this.selectedClienti.includes(c.id!));

    // Create CSV content
    const headers = ['Nome', 'Cognome', 'Email', 'Telefono', 'Codice Fiscale'];
    const csvContent = [
      headers.join(','),
      ...clientiToExport.map(c =>
        [c.nome, c.cognome, c.email, c.telefono, c.codiceFiscale].join(',')
      )
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clienti_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  refreshList(): void {
    this.loadData();
  }

  // Utility methods
  Math = Math;
}