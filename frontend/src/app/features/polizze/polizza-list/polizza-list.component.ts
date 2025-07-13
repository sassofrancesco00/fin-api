import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../shared/models/cliente';
import { PolizzaAssicurativa } from '../../../shared/models/polizza';
import { User } from '../../../shared/models/user';
import { NotaInterna } from '../../../shared/models/nota-interna';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-polizza-assicurativa',
  templateUrl: './polizza-list.component.html',
  styleUrls: ['./polizza-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule// importa il componente sidebar
  ],
})
export class PolizzaListComponent implements OnInit {
  polizze: PolizzaAssicurativa[] = [];
  polizzaSelezionata: PolizzaAssicurativa | null = null;
  showDettagli = false;
  showAggiungiForm = false;
  showNoteInterne = false;
  
  // Dati mockati
  clientiMock: Cliente[] = [
    {
      id: 1,
      nome: 'Mario',
      cognome: 'Rossi',
      codiceFiscale: 'RSSMRA80A01H501Z',
      telefono: '339123456',
      email: 'mario.rossi@email.com'
    },
    {
      id: 2,
      nome: 'Giulia',
      cognome: 'Bianchi',
      codiceFiscale: 'BNCGLI85B15F205W',
      telefono: '347987654',
      email: 'giulia.bianchi@email.com'
    }
  ];

  userMock: User[] = [
    {
      id: 1,
      firstname: 'Luca',
      lastname: 'Verdi',
      email: 'luca.verdi@assicurazioni.it',
      ruoloCode: 'AGENT',
      role: 'Agente'
    },
    {
      id: 2,
      firstname: 'Sara',
      lastname: 'Neri',
      email: 'sara.neri@assicurazioni.it',
      ruoloCode: 'MANAGER',
      role: 'Manager'
    }
  ];

  noteInterneMock: NotaInterna[] = [
    {
      id: 1,
      polizzaId: 1,
      autoreId: 1,
      autore: this.userMock[0],
      testo: 'Cliente ha fornito tutta la documentazione necessaria',
      dataCreazione: new Date('2024-01-15T10:30:00')
    },
    {
      id: 2,
      polizzaId: 1,
      autoreId: 2,
      autore: this.userMock[1],
      testo: 'Polizza approvata dopo verifica documentale',
      dataCreazione: new Date('2024-01-16T14:20:00')
    }
  ];

  nuovaPolizza: PolizzaAssicurativa = {
    clienteId: 0,
    userId: 1,
    tipoPolizza: 'Vita',
    numeroPolizza: '',
    premio: 0,
    dataInizio: new Date(),
    dataScadenza: new Date(),
    stato: 'in_revisione'
  };

  constructor() { }

  ngOnInit(): void {
    this.loadPolizze();
  }

  loadPolizze(): void {
    // Dati mockati delle polizze
    this.polizze = [
      {
        id: 1,
        clienteId: 1,
        cliente: this.clientiMock[0],
        userId: 1,
        user: this.userMock[0],
        tipoPolizza: 'Vita',
        numeroPolizza: 'VIT001234',
        premio: 1200.00,
        dataInizio: new Date('2024-01-01'),
        dataScadenza: new Date('2024-12-31'),
        stato: 'Approvata',
        noteInterne: this.noteInterneMock.filter(n => n.polizzaId === 1)
      },
      {
        id: 2,
        clienteId: 2,
        cliente: this.clientiMock[1],
        userId: 2,
        user: this.userMock[1],
        tipoPolizza: 'RC_Auto',
        numeroPolizza: 'RCA005678',
        premio: 800.00,
        dataInizio: new Date('2024-02-01'),
        dataScadenza: new Date('2025-01-31'),
        stato: 'in_revisione'
      },
      {
        id: 3,
        clienteId: 1,
        cliente: this.clientiMock[0],
        userId: 1,
        user: this.userMock[0],
        tipoPolizza: 'Casa',
        numeroPolizza: 'CSA009876',
        premio: 450.00,
        dataInizio: new Date('2024-03-01'),
        dataScadenza: new Date('2025-02-28'),
        stato: 'Respinta',
        motivazioneRespinta: 'Documentazione incompleta'
      }
    ];
  }

  visualizzaDettagli(polizza: PolizzaAssicurativa): void {
    this.polizzaSelezionata = polizza;
    this.showDettagli = true;
    this.showNoteInterne = false;
  }

  chiudiDettagli(): void {
    this.showDettagli = false;
    this.polizzaSelezionata = null;
    this.showNoteInterne = false;
  }

  mostraFormAggiungi(): void {
    this.showAggiungiForm = true;
    this.resetNuovaPolizza();
  }

  chiudiFormAggiungi(): void {
    this.showAggiungiForm = false;
    this.resetNuovaPolizza();
  }

  resetNuovaPolizza(): void {
    this.nuovaPolizza = {
      clienteId: 0,
      userId: 1,
      tipoPolizza: 'Vita',
      numeroPolizza: '',
      premio: 0,
      dataInizio: new Date(),
      dataScadenza: new Date(),
      stato: 'in_revisione'
    };
  }

  aggiungiPolizza(): void {
    if (this.validaPolizza()) {
      const nuovaId = Math.max(...this.polizze.map(p => p.id || 0)) + 1;
      const clienteSelezionato = this.clientiMock.find(c => c.id === this.nuovaPolizza.clienteId);
      const userSelezionato = this.userMock.find(u => u.id === this.nuovaPolizza.userId);
      
      const polizzaDaAggiungere: PolizzaAssicurativa = {
        ...this.nuovaPolizza,
        id: nuovaId,
        cliente: clienteSelezionato,
        user: userSelezionato,
        noteInterne: []
      };

      this.polizze.push(polizzaDaAggiungere);
      this.chiudiFormAggiungi();
    }
  }

  validaPolizza(): boolean {
    return this.nuovaPolizza.clienteId > 0 && 
           this.nuovaPolizza.numeroPolizza.length > 0 && 
           this.nuovaPolizza.premio > 0;
  }

  approvaPolizza(polizza: PolizzaAssicurativa): void {
    const index = this.polizze.findIndex(p => p.id === polizza.id);
    if (index !== -1) {
      this.polizze[index].stato = 'Approvata';
      this.polizze[index].motivazioneRespinta = undefined;
    }
  }

  respingiPolizza(polizza: PolizzaAssicurativa): void {
    const motivazione = prompt('Inserisci la motivazione del respingimento:');
    if (motivazione) {
      const index = this.polizze.findIndex(p => p.id === polizza.id);
      if (index !== -1) {
        this.polizze[index].stato = 'Respinta';
        this.polizze[index].motivazioneRespinta = motivazione;
      }
    }
  }

  eliminaPolizza(polizza: PolizzaAssicurativa): void {
    if (confirm('Sei sicuro di voler eliminare questa polizza?')) {
      this.polizze = this.polizze.filter(p => p.id !== polizza.id);
      if (this.polizzaSelezionata?.id === polizza.id) {
        this.chiudiDettagli();
      }
    }
  }

  visualizzaNoteInterne(): void {
    this.showNoteInterne = true;
  }

  chiudiNoteInterne(): void {
    this.showNoteInterne = false;
  }

  getStatoClass(stato: string): string {
    switch (stato) {
      case 'Approvata': return 'stato-approvata';
      case 'Respinta': return 'stato-respinta';
      default: return 'stato-revisione';
    }
  }

  getTipoPolizzaDescrizione(tipo: string): string {
    switch (tipo) {
      case 'Vita': return 'Assicurazione Vita';
      case 'Infortuni': return 'Assicurazione Infortuni';
      case 'RC_Auto': return 'RC Auto';
      case 'Casa': return 'Assicurazione Casa';
      default: return tipo;
    }
  }
}