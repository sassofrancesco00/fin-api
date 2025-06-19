import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiResponse, PaginatedResponse } from '../models/api-response';
import { RichiestaInvestimento } from '../models/richiesta-investimento';
import {environmentTest} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RichiestaInvestimentoService {
  private readonly endpoint = `${environmentTest.apiUrlLocal}/richieste-investimento`;

  constructor(private http: HttpClient) {}

  getRichieste(page: number = 0, size: number = 10, filters?: any): Observable<PaginatedResponse<RichiestaInvestimento>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      if (filters.stato) params = params.set('stato', filters.stato);
      if (filters.clienteId) params = params.set('clienteId', filters.clienteId.toString());
      if (filters.userId) params = params.set('userId', filters.userId.toString());
      if (filters.tipoInvestimento) params = params.set('tipoInvestimento', filters.tipoInvestimento);
    }

    return this.http.get<PaginatedResponse<RichiestaInvestimento>>(this.endpoint, { params });
  }

  getRichiestaById(id: number): Observable<ApiResponse<RichiestaInvestimento>> {
    return this.http.get<ApiResponse<RichiestaInvestimento>>(`${this.endpoint}/${id}`);
  }

  createRichiesta(richiesta: RichiestaInvestimento): Observable<ApiResponse<RichiestaInvestimento>> {
    return this.http.post<ApiResponse<RichiestaInvestimento>>(this.endpoint, richiesta);
  }

  updateRichiesta(id: number, richiesta: RichiestaInvestimento): Observable<ApiResponse<RichiestaInvestimento>> {
    return this.http.put<ApiResponse<RichiestaInvestimento>>(`${this.endpoint}/${id}`, richiesta);
  }

  approvaRichiesta(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.endpoint}/${id}/approva`, {});
  }

  respingiRichiesta(id: number, motivazione: string): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.endpoint}/${id}/respingi`, { motivazione });
  }

  deleteRichiesta(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }

  getRichiesteByUser(userId: number): Observable<RichiestaInvestimento[]> {
    return this.http.get<RichiestaInvestimento[]>(`${this.endpoint}/user/${userId}`);
  }
}
