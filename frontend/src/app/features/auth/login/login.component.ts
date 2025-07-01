// src/app/features/auth/login/login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  showPassword = false;
  rememberMe = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Se l'utente è già autenticato, reindirizza alla dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.initializeForm();
    this.loadRememberedCredentials();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private loadRememberedCredentials(): void {
    // Carica credenziali salvate se l'utente aveva selezionato "ricordami"
    if (typeof localStorage !== 'undefined') {
      const rememberedEmail = localStorage.getItem('finapi_remembered_email');
      if (rememberedEmail) {
        this.loginForm.patchValue({ email: rememberedEmail });
        this.rememberMe = true;
      }
    }
  }

  onSubmit(): void {
    this.error = '';

    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          // Gestisci "ricordami"
          this.handleRememberMe(credentials.email);

          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loading = false;
          this.handleLoginError(error);
        }
      });
  }

  private handleRememberMe(email: string): void {
    if (typeof localStorage !== 'undefined') {
      if (this.rememberMe) {
        localStorage.setItem('finapi_remembered_email', email);
      } else {
        localStorage.removeItem('finapi_remembered_email');
      }
    }
  }

  private handleLoginError(error: any): void {
    if (error.status === 401) {
      this.error = 'Credenziali non valide. Verifica email e password.';
    } else if (error.status === 403) {
      this.error = 'Accesso negato. Contatta l\'amministratore.';
    } else if (error.status === 500) {
      this.error = 'Errore del server. Riprova più tardi.';
    } else if (error.status === 0) {
      this.error = 'Impossibile contattare il server. Verifica la connessione.';
    } else if (error.error?.message) {
      this.error = error.error.message;
    } else if (error.message) {
      this.error = error.message;
    } else {
      this.error = 'Errore durante il login. Riprova.';
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter per il template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Metodi per il template
  onRememberMeChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.rememberMe = checkbox.checked;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.error = '';
  }

  // Metodo per gestire il recupero password
  onForgotPassword(): void {
    // Implementa la logica per il recupero password
    console.log('Forgot password clicked');
    // this.router.navigate(['/forgot-password']);
  }
}
