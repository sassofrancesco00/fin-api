import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, User } from '../../shared/models/user';
import { environmentTest } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Aggiungi queste interfacce per la registrazione
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  ruoloCode: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'finapi_token';
  private readonly USER_KEY = 'finapi_user';
  private readonly REFRESH_TOKEN_KEY = 'finapi_refresh_token';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environmentTest.apiUrlLocal}/auth/authenticate`, credentials)
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          if (response.token && response.user) {
            this.setSession(response);
          }
        }),
        catchError(this.handleError)
      );
  }

  // NUOVA FUNZIONE DI REGISTRAZIONE
  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post<AuthenticationResponse>(`${environmentTest.apiUrlLocal}/auth/register`, registerData)
      .pipe(
        tap(response => {
          console.log('Registration response:', response);
          if (response.accessToken) {
            // Dopo la registrazione, salva il token e crea un oggetto user temporaneo
            this.setRegistrationSession(response, registerData);
          }
        }),
        catchError(this.handleRegistrationError)
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const isValid = Date.now() < exp;

      if (!isValid) {
        this.logout();
      }

      return isValid;
    } catch (error) {
      console.error('Error parsing token:', error);
      this.logout();
      return false;
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role || user?.role === role;
  }

  isSupervisore(): boolean {
    return this.hasRole('SUPERVISORE');
  }

  isConsulente(): boolean {
    return this.hasRole('CONSULENTE');
  }

  private setSession(response: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }
    this.currentUserSubject.next(response.user);
  }

  // Nuova funzione per gestire la sessione dopo la registrazione
  private setRegistrationSession(response: AuthenticationResponse, registerData: RegisterRequest): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);

      // Crea un oggetto user temporaneo con i dati della registrazione
      const tempUser: User = {
        id: 0, // Verrà aggiornato quando riceverai i dati completi dal server
        firstname: registerData.firstname,
        lastname: registerData.lastname,
        email: registerData.email,
        role: 'USER',
        ruoloCode: 'U'
      };

      localStorage.setItem(this.USER_KEY, JSON.stringify(tempUser));
      this.currentUserSubject.next(tempUser);
    }
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Si è verificato un errore durante il login';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Credenziali non valide';
          break;
        case 403:
          errorMessage = 'Accesso negato';
          break;
        case 404:
          errorMessage = 'Servizio non trovato';
          break;
        case 500:
          errorMessage = 'Errore interno del server';
          break;
        default:
          errorMessage = `Errore ${error.status}: ${error.message}`;
      }
    }

    console.error('Auth Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  // Nuova funzione per gestire gli errori di registrazione
  private handleRegistrationError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Si è verificato un errore durante la registrazione';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Dati di registrazione non validi';
          break;
        case 409:
          errorMessage = 'Email già registrata';
          break;
        case 422:
          errorMessage = 'Dati non validi. Controlla i campi inseriti';
          break;
        case 500:
          errorMessage = 'Errore interno del server';
          break;
        default:
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else {
            errorMessage = `Errore ${error.status}: ${error.message}`;
          }
      }
    }

    console.error('Registration Error:', error);
    return throwError(() => error);
  }
}
