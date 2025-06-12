import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PolizzaAssicurativa } from '../models/polizza.model';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PolizzaService {
  private readonly endpoint = `${environment.apiUrl}/polizze`;

  constructor(private http: HttpClient) {}

  getPolizze(page: number = 0, size: number = 10, filters?: any): Observable<PaginatedResponse<PolizzaAssicurativa>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      if (filters.stato) params = params.set('stato', filters.stato);
      if (filters.clienteId) params = params.set('clienteId', filters.clienteId.toString());
      if (filters.userId) params = params.set('userId', filters.userId.toString());
      if (filters.tipoPolizza) params = params.set('tipoPolizza', filters.tipoPolizza);
    }

    return this.http.get<PaginatedResponse<PolizzaAssicurativa>>(this.endpoint, { params });
  }

  getPolizzaById(id: number): Observable<ApiResponse<PolizzaAssicurativa>> {
    return this.http.get<ApiResponse<PolizzaAssicurativa>>(`${this.endpoint}/${id}`);
  }

  createPolizza(polizza: PolizzaAssicurativa): Observable<ApiResponse<PolizzaAssicurativa>> {
    return this.http.post<ApiResponse<PolizzaAssicurativa>>(this.endpoint, polizza);
  }

  updatePolizza(id: number, polizza: PolizzaAssicurativa): Observable<ApiResponse<PolizzaAssicurativa>> {
    return this.http.put<ApiResponse<PolizzaAssicurativa>>(`${this.endpoint}/${id}`, polizza);
  }

  approvaPolizza(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.endpoint}/${id}/approva`, {});
  }

  respingiPolizza(id: number, motivazione: string): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.endpoint}/${id}/respingi`, { motivazione });
  }

  deletePolizza(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }

  getPolizzeByUser(userId: number): Observable<PolizzaAssicurativa[]> {
    return this.http.get<PolizzaAssicurativa[]>(`${this.endpoint}/user/${userId}`);
  }

  getPolizzeInScadenza(giorni: number = 30): Observable<PolizzaAssicurativa[]> {
    const params = new HttpParams().set('giorni', giorni.toString());
    return this.http.get<PolizzaAssicurativa[]>(`${this.endpoint}/scadenza`, { params });
  }
}
