import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  ruolo: string;
}

export interface Richiesta {
  id: number;
  cliente: Cliente;
  importo: number;
  tipoInvestimento: 'Azioni' | 'Obbligazioni' | 'ETF';
  dataInserimento: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  user: User;
  motivazioneRespinta?: string;
  note?: string;
}

export interface SidebarRoute {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-richiesta-list',
  templateUrl: './richiesta-list.component.html',
  styleUrls: ['./richiesta-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule// importa il componente sidebar
  ],
})
export class RichiestaListComponent implements OnInit {
  loading = false;
  richieste: Richiesta[] = [];
  filteredRichieste: Richiesta[] = [];
  paginatedRichieste: Richiesta[] = [];
  selectedRichiesta: Richiesta | null = null;

  // Filters
  searchTerm = '';
  selectedStato = '';
  selectedTipo = '';
  dataInizioFilter = '';
  dataFineFilter = '';

  // Sorting
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  // Modal data
  motivazioneRifiuto = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadRichieste();
  }

  loadRichieste(): void {
    this.loading = true;

    // Simula chiamata API
    setTimeout(() => {
      this.richieste = this.generateMockData();
      this.applyFilters();
      this.loading = false;
    }, 1000);
  }

  generateMockData(): Richiesta[] {
    const mockData: Richiesta[] = [
      {
        id: 1,
        cliente: {
          id: 1,
          nome: 'Mario',
          cognome: 'Rossi',
          email: 'mario.rossi@email.com',
          telefono: '+39 123 456 7890'
        },
        importo: 50000,
        tipoInvestimento: 'Azioni',
        dataInserimento: new Date('2024-01-15T10:30:00'),
        stato: 'in_revisione',
        user: {
          id: 1,
          firstname: 'Giuseppe',
          lastname: 'Bianchi',
          ruolo: 'Consulente Senior'
        }
      },
      {
        id: 2,
        cliente: {
          id: 2,
          nome: 'Anna',
          cognome: 'Verdi',
          email: 'anna.verdi@email.com',
          telefono: '+39 987 654 3210'
        },
        importo: 75000,
        tipoInvestimento: 'ETF',
        dataInserimento: new Date('2024-01-20T14:15:00'),
        stato: 'Approvata',
        user: {
          id: 2,
          firstname: 'Maria',
          lastname: 'Neri',
          ruolo: 'Consulente'
        }
      },
      {
        id: 3,
        cliente: {
          id: 3,
          nome: 'Luigi',
          cognome: 'Blu',
          email: 'luigi.blu@email.com',
          telefono: '+39 555 123 4567'
        },
        importo: 25000,
        tipoInvestimento: 'Obbligazioni',
        dataInserimento: new Date('2024-01-25T09:45:00'),
        stato: 'Respinta',
        user: {
          id: 1,
          firstname: 'Giuseppe',
          lastname: 'Bianchi',
          ruolo: 'Consulente Senior'
        },
        motivazioneRespinta: 'Profilo di rischio non compatibile con il tipo di investimento richiesto'
      }
    ];

    return mockData;
  }

  applyFilters(): void {
    this.filteredRichieste = this.richieste.filter(richiesta => {
      const matchesSearch = !this.searchTerm ||
        richiesta.cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        richiesta.cliente.cognome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        richiesta.cliente.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStato = !this.selectedStato || richiesta.stato === this.selectedStato;
      const matchesTipo = !this.selectedTipo || richiesta.tipoInvestimento === this.selectedTipo;

      let matchesDataInizio = true;
      if (this.dataInizioFilter) {
        const dataInizio = new Date(this.dataInizioFilter);
        matchesDataInizio = richiesta.dataInserimento >= dataInizio;
      }

      let matchesDataFine = true;
      if (this.dataFineFilter) {
        const dataFine = new Date(this.dataFineFilter);
        dataFine.setHours(23, 59, 59, 999);
        matchesDataFine = richiesta.dataInserimento <= dataFine;
      }

      return matchesSearch && matchesStato && matchesTipo && matchesDataInizio && matchesDataFine;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredRichieste.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (field === 'cliente.cognome') {
        aValue = a.cliente.cognome;
        bValue = b.cliente.cognome;
      } else if (field === 'importo') {
        aValue = a.importo;
        bValue = b.importo;
      } else if (field === 'dataInserimento') {
        aValue = a.dataInserimento;
        bValue = b.dataInserimento;
      } else {
        aValue = (a as any)[field];
        bValue = (b as any)[field];
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRichieste.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRichieste = this.filteredRichieste.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
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

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStato = '';
    this.selectedTipo = '';
    this.dataInizioFilter = '';
    this.dataFineFilter = '';
    this.applyFilters();
  }

  refreshData(): void {
    this.loadRichieste();
  }

  getRichiesteByStato(stato: string): Richiesta[] {
    return this.richieste.filter(r => r.stato === stato);
  }

  calculateTotalVolume(): number {
    return this.richieste.reduce((total, richiesta) => total + richiesta.importo, 0);
  }

  getInitials(fullName: string): string {
    return fullName.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  }

  getTipoClass(tipo: string): string {
    const classes = {
      'Azioni': 'bg-primary',
      'Obbligazioni': 'bg-success',
      'ETF': 'bg-info'
    };
    return classes[tipo as keyof typeof classes] || 'bg-secondary';
  }

  getStatoClass(stato: string): string {
    const classes = {
      'in_revisione': 'bg-warning',
      'Approvata': 'bg-success',
      'Respinta': 'bg-danger'
    };
    return classes[stato as keyof typeof classes] || 'bg-secondary';
  }

  canApprove(): boolean {
    // Implementa la logica per verificare se l'utente può approvare
    return true; // Placeholder
  }

  // Modal and Action Methods
  openNewRichiestaModal(): void {
    // Implementa apertura modal per nuova richiesta
    console.log('Apertura modal nuova richiesta');
  }

  viewRichiesta(richiesta: Richiesta): void {
    this.selectedRichiesta = richiesta;
    // Apri modal di visualizzazione
    const modal = document.getElementById('viewRichiestaModal');
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  editRichiesta(richiesta: Richiesta): void {
    // Implementa modifica richiesta
    console.log('Modifica richiesta:', richiesta);
    this.router.navigate(['/richieste/edit', richiesta.id]);
  }

  approveRichiesta(richiesta: Richiesta): void {
    if (confirm('Sei sicuro di voler approvare questa richiesta?')) {
      richiesta.stato = 'Approvata';
      // Implementa chiamata API per approvare
      console.log('Richiesta approvata:', richiesta);
    }
  }

  rejectRichiesta(richiesta: Richiesta): void {
    this.selectedRichiesta = richiesta;
    this.motivazioneRifiuto = '';
    const modal = document.getElementById('rejectModal');
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  confirmReject(): void {
    if (this.selectedRichiesta && this.motivazioneRifiuto.trim()) {
      this.selectedRichiesta.stato = 'Respinta';
      this.selectedRichiesta.motivazioneRespinta = this.motivazioneRifiuto;

      // Implementa chiamata API per rifiutare
      console.log('Richiesta rifiutata:', this.selectedRichiesta);

      // Chiudi modal
      const modal = document.getElementById('rejectModal');
      if (modal) {
        (window as any).bootstrap.Modal.getOrCreateInstance(modal).hide();
      }
    }
  }

  addNota(richiesta: Richiesta): void {
    const nota = prompt('Inserisci una nota per questa richiesta:');
    if (nota) {
      richiesta.note = nota;
      // Implementa chiamata API per salvare la nota
      console.log('Nota aggiunta:', richiesta);
    }
  }

  deleteRichiesta(richiesta: Richiesta): void {
    if (confirm('Sei sicuro di voler eliminare questa richiesta? Questa azione non può essere annullata.')) {
      const index = this.richieste.findIndex(r => r.id === richiesta.id);
      if (index !== -1) {
        this.richieste.splice(index, 1);
        this.applyFilters();
      }
      // Implementa chiamata API per eliminare
      console.log('Richiesta eliminata:', richiesta);
    }
  }

  exportToExcel(): void {
    const exportData = this.filteredRichieste.map(richiesta => ({
      'Cliente': `${richiesta.cliente.nome} ${richiesta.cliente.cognome}`,
      'Email': richiesta.cliente.email,
      'Importo': richiesta.importo,
      'Tipo Investimento': richiesta.tipoInvestimento,
      'Data Richiesta': richiesta.dataInserimento.toLocaleDateString('it-IT'),
      'Stato': richiesta.stato === 'in_revisione' ? 'In Revisione' : richiesta.stato,
      'Consulente': `${richiesta.user.firstname} ${richiesta.user.lastname}`,
      'Motivazione Rifiuto': richiesta.motivazioneRespinta || ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Richieste');
    XLSX.writeFile(wb, `richieste_${new Date().toLocaleDateString('it-IT')}.xlsx`);
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    const tableColumn = ['Cliente', 'Importo', 'Tipo', 'Data', 'Stato', 'Consulente'];
    const tableRows: string[][] = [];

    this.filteredRichieste.forEach(richiesta => {
      const richiestaData = [
        `${richiesta.cliente.nome} ${richiesta.cliente.cognome}`,
        `€ ${richiesta.importo.toLocaleString('it-IT')}`,
        richiesta.tipoInvestimento,
        richiesta.dataInserimento.toLocaleDateString('it-IT'),
        richiesta.stato === 'in_revisione' ? 'In Revisione' : richiesta.stato,
        `${richiesta.user.firstname} ${richiesta.user.lastname}`
      ];
      tableRows.push(richiestaData);
    });

    doc.setFontSize(20);
    doc.text('Richieste di Investimento', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generato il: ${new Date().toLocaleDateString('it-IT')}`, 14, 32);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255
      }
    });

    doc.save(`richieste_${new Date().toLocaleDateString('it-IT')}.pdf`);
  }

  // Utility method for Math functions in template
  Math = Math;
}
