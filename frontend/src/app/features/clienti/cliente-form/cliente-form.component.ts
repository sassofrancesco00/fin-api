// src/app/features/clienti/cliente-form/cliente-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

// Interfaces
interface Cliente {
  id?: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  telefono: string;
  email: string;
  dataNascita?: Date;
  luogoNascita?: string;
  indirizzo?: string;
  cap?: string;
  citta?: string;
  provincia?: string;
  dataCreazione?: Date;
  dataModifica?: Date;
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent
  ]
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  loading = false;
  saving = false;
  isEditMode = false;
  clienteId: number | null = null;
  successMessage = '';
  errorMessage = '';
  lastModified: Date | null = null;

  // Mock data per la simulazione
  private readonly mockClienti: Cliente[] = [
    {
      id: 1,
      nome: 'Mario',
      cognome: 'Rossi',
      codiceFiscale: 'RSSMRA80A01H501X',
      telefono: '3331234567',
      email: 'mario.rossi@email.it',
      dataNascita: new Date('1980-01-01'),
      luogoNascita: 'Roma (RM)',
      indirizzo: 'Via Roma, 123',
      cap: '00100',
      citta: 'Roma',
      provincia: 'RM',
      dataCreazione: new Date('2024-01-15'),
      dataModifica: new Date('2024-06-20')
    },
    {
      id: 2,
      nome: 'Giuseppe',
      cognome: 'Verdi',
      codiceFiscale: 'VRDGPP75B15F205Y',
      telefono: '3339876543',
      email: 'giuseppe.verdi@email.it',
      dataNascita: new Date('1975-02-15'),
      luogoNascita: 'Milano (MI)',
      indirizzo: 'Via Verdi, 45',
      cap: '20100',
      citta: 'Milano',
      provincia: 'MI',
      dataCreazione: new Date('2024-02-10'),
      dataModifica: new Date('2024-06-15')
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.createForm();
  }

  ngOnInit(): void {
    this.checkRouteParams();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
      ]],
      cognome: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
      ]],
      codiceFiscale: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/)
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^(\+39\s?)?((3[0-9]{2})|(0[0-9]{2,3}))\s?[0-9]{6,7}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      dataNascita: ['', [this.dateValidator]],
      luogoNascita: ['', [Validators.maxLength(100)]],
      indirizzo: ['', [Validators.maxLength(200)]],
      cap: ['', [Validators.pattern(/^[0-9]{5}$/)]],
      citta: ['', [Validators.maxLength(100)]],
      provincia: ['', [
        Validators.maxLength(2),
        Validators.pattern(/^[A-Z]{2}$/)
      ]]
    });
  }

  private checkRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.clienteId = parseInt(id, 10);
      this.isEditMode = true;
      this.loadCliente();
    }
  }

  private loadCliente(): void {
    if (!this.clienteId) return;

    this.loading = true;

    // Simula chiamata API
    setTimeout(() => {
      const cliente = this.mockClienti.find(c => c.id === this.clienteId);

      if (cliente) {
        this.populateForm(cliente);
        this.lastModified = cliente.dataModifica || null;
      } else {
        this.errorMessage = 'Cliente non trovato';
        setTimeout(() => this.router.navigate(['/clienti']), 2000);
      }

      this.loading = false;
    }, 1000);
  }

  private populateForm(cliente: Cliente): void {
    this.clienteForm.patchValue({
      nome: cliente.nome,
      cognome: cliente.cognome,
      codiceFiscale: cliente.codiceFiscale,
      telefono: cliente.telefono,
      email: cliente.email,
      dataNascita: cliente.dataNascita ? this.formatDateForInput(cliente.dataNascita) : '',
      luogoNascita: cliente.luogoNascita || '',
      indirizzo: cliente.indirizzo || '',
      cap: cliente.cap || '',
      citta: cliente.citta || '',
      provincia: cliente.provincia || ''
    });
  }

  private formatDateForInput(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  // Custom validator per la data di nascita
  private dateValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    const today = new Date();

    if (inputDate > today) {
      return { invalidDate: true };
    }

    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.clienteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      this.markFormGroupTouched(this.clienteForm);
      this.errorMessage = 'Compila tutti i campi obbligatori correttamente';
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.clienteForm.value;

    // Simula chiamata API
    setTimeout(() => {
      try {
        if (this.isEditMode) {
          this.updateCliente(formData);
        } else {
          this.createCliente(formData);
        }

        this.saving = false;
        this.successMessage = `Cliente ${this.isEditMode ? 'aggiornato' : 'creato'} con successo!`;

        // Reindirizza alla lista dopo 2 secondi
        setTimeout(() => {
          this.router.navigate(['/clienti']);
        }, 2000);

      } catch (error) {
        this.saving = false;
        this.errorMessage = `Errore durante il ${this.isEditMode ? 'aggiornamento' : 'salvataggio'} del cliente`;
      }
    }, 1500);
  }

  private createCliente(formData: any): void {
    const nuovoCliente: Cliente = {
      id: this.getNextId(),
      ...formData,
      dataNascita: formData.dataNascita ? new Date(formData.dataNascita) : undefined,
      dataCreazione: new Date(),
      dataModifica: new Date()
    };

    this.mockClienti.push(nuovoCliente);
    console.log('Cliente creato:', nuovoCliente);
  }

  private updateCliente(formData: any): void {
    const index = this.mockClienti.findIndex(c => c.id === this.clienteId);
    if (index !== -1) {
      this.mockClienti[index] = {
        ...this.mockClienti[index],
        ...formData,
        dataNascita: formData.dataNascita ? new Date(formData.dataNascita) : undefined,
        dataModifica: new Date()
      };
      console.log('Cliente aggiornato:', this.mockClienti[index]);
    }
  }

  private getNextId(): number {
    return Math.max(...this.mockClienti.map(c => c.id || 0)) + 1;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Metodi di utilità per il template
  resetForm(): void {
    this.clienteForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/clienti']);
  }

  // Configurazione sidebar
  sidebarRoutes = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
    { label: 'Clienti', icon: 'fas fa-users', route: '/clienti' },
    { label: 'Investimenti', icon: 'fas fa-chart-line', route: '/investimenti' },
    { label: 'Polizze', icon: 'fas fa-shield-alt', route: '/polizze' }
  ];
}
