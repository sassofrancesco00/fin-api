import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, User } from '../../shared/models/user';
import { environmentTest } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'finapi_token';
  private readonly USER_KEY = 'finapi_user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // CORREZIONE: Usa l'endpoint corretto dal tuo controller
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

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Verifica se il token è scaduto
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const isValid = Date.now() < exp;

      if (!isValid) {
        this.logout(); // Auto-logout se scaduto
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

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.ruolo === role || user?.role === role;
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
      // Errore client-side
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      // Errore server-side
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
}
