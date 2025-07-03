import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

interface Cliente {
  id?: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  telefono: string;
  email: string;
}

interface RichiestaInvestimento {
  id?: number;
  clienteId: number;
  cliente?: Cliente;
  userId: number;
  importo: number;
  tipoInvestimento: 'Azioni' | 'Obbligazioni' | 'ETF';
  dataInserimento: Date;
  dataModifica: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  motivazioneRespinta?: string;
  consulenteId: number;
}

interface PolizzaAssicurativa {
  id?: number;
  clienteId: number;
  cliente?: Cliente;
  userId: number;
  tipoPolizza: 'Vita' | 'Infortuni' | 'RC_Auto' | 'Casa';
  numeroPolizza: string;
  premio: number;
  dataInizio: Date;
  dataScadenza: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  motivazioneRespinta?: string;
}

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  // Data properties
  clienti: Cliente[] = [];
  filteredClienti: Cliente[] = [];
  paginatedClienti: Cliente[] = [];

  // Mock data for related entities
  richieste: RichiestaInvestimento[] = [];
  polizze: PolizzaAssicurativa[] = [];

  // UI State
  loading = true;

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;

    // Mock data - in real app, these would come from services
    setTimeout(() => {
      this.clienti = [
        { id: 1, nome: 'Mario', cognome: 'Rossi', codiceFiscale: 'RSSMRA80A01H501X', telefono: '3331234567', email: 'mario.rossi@email.it' },
        { id: 2, nome: 'Giuseppe', cognome: 'Verdi', codiceFiscale: 'VRDGPP75B15F205Y', telefono: '3339876543', email: 'giuseppe.verdi@email.it' },
        { id: 3, nome: 'Maria', cognome: 'Bianchi', codiceFiscale: 'BNCMRA85C20D612Z', telefono: '3335554444', email: 'maria.bianchi@email.it' },
        { id: 4, nome: 'Franco', cognome: 'Neri', codiceFiscale: 'NRIFNC70D10A662W', telefono: '3337778888', email: 'franco.neri@email.it' },
        { id: 5, nome: 'Laura', cognome: 'Gialli', codiceFiscale: 'GLLLRA88E25B345V', telefono: '3332223333', email: 'laura.gialli@email.it' },
        { id: 6, nome: 'Alessandro', cognome: 'Blu', codiceFiscale: 'BLUALS90F12C123A', telefono: '3334445555', email: 'alessandro.blu@email.it' },
        { id: 7, nome: 'Giulia', cognome: 'Rosa', codiceFiscale: 'RSOGLI92H25D456B', telefono: '3336667777', email: 'giulia.rosa@email.it' },
        { id: 8, nome: 'Davide', cognome: 'Viola', codiceFiscale: 'VLADV088L30E789C', telefono: '3338889999', email: 'davide.viola@email.it' }
      ];

      this.richieste = [
        { id: 1, clienteId: 1, userId: 1, importo: 50000, tipoInvestimento: 'ETF', dataInserimento: new Date('2025-06-15'), dataModifica: new Date('2025-06-15'), stato: 'in_revisione', consulenteId: 1 },
        { id: 2, clienteId: 2, userId: 1, importo: 25000, tipoInvestimento: 'Azioni', dataInserimento: new Date('2025-06-14'), dataModifica: new Date('2025-06-14'), stato: 'Approvata', consulenteId: 1 },
        { id: 3, clienteId: 1, userId: 1, importo: 75000, tipoInvestimento: 'Obbligazioni', dataInserimento: new Date('2025-06-13'), dataModifica: new Date('2025-06-13'), stato: 'Respinta', consulenteId: 1 }
      ];

      this.polizze = [
        { id: 1, clienteId: 1, userId: 1, tipoPolizza: 'RC_Auto', numeroPolizza: 'AUTO001', premio: 1200, dataInizio: new Date('2025-01-15'), dataScadenza: new Date('2025-12-15'), stato: 'Approvata' },
        { id: 2, clienteId: 2, userId: 1, tipoPolizza: 'Casa', numeroPolizza: 'CASA001', premio: 800, dataInizio: new Date('2024-07-22'), dataScadenza: new Date('2025-07-22'), stato: 'Approvata' },
        { id: 3, clienteId: 3, userId: 1, tipoPolizza: 'Vita', numeroPolizza: 'VITA001', premio: 2500, dataInizio: new Date('2024-11-10'), dataScadenza: new Date('2025-11-10'), stato: 'Approvata' }
      ];

      this.calculateStats();
      this.applyFilters();
      this.loading = false;
    }, 1000);
  }

  private calculateStats(): void {
    this.totalClienti = this.clienti.length;
    this.clientiAttivi = this.clienti.length; // Assuming all are active for now

    const clientiConInvestimentiSet = new Set(this.richieste.map(r => r.clienteId));
    this.clientiConInvestimenti = clientiConInvestimentiSet.size;

    const clientiConPolizzeSet = new Set(this.polizze.map(p => p.clienteId));
    this.clientiConPolizze = clientiConPolizzeSet.size;
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
    return this.richieste.filter(r => r.clienteId === clienteId);
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
      this.clienti = this.clienti.filter(c => c.id !== cliente.id);
      this.selectedClienti = this.selectedClienti.filter(id => id !== cliente.id);
      this.calculateStats();
      this.applyFilters();

      // Show success message
      alert('Cliente eliminato con successo!');
    }
  }

  deleteSelected(): void {
    if (this.selectedClienti.length === 0) return;

    if (confirm(`Sei sicuro di voler eliminare ${this.selectedClienti.length} clienti selezionati?`)) {
      this.clienti = this.clienti.filter(c => !this.selectedClienti.includes(c.id!));
      this.selectedClienti = [];
      this.selectAll = false;
      this.calculateStats();
      this.applyFilters();

      // Show success message
      alert('Clienti eliminati con successo!');
    }
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
