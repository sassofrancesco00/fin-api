import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiResponse, PaginatedResponse} from '../models/api-response';
import { Cliente } from '../models/cliente';
import {environmentTest} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly endpoint = `${environmentTest.apiUrlLocal}/clienti`;

  constructor(private http: HttpClient) {}

  getClienti(page: number = 0, size: number = 10, search: string = ''): Observable<PaginatedResponse<Cliente>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Cliente>>(this.endpoint, { params });
  }

  getClienteById(id: number): Observable<ApiResponse<Cliente>> {
    return this.http.get<ApiResponse<Cliente>>(`${this.endpoint}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<ApiResponse<Cliente>> {
    return this.http.post<ApiResponse<Cliente>>(this.endpoint, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<ApiResponse<Cliente>> {
    return this.http.put<ApiResponse<Cliente>>(`${this.endpoint}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }

  searchClienti(term: string): Observable<Cliente[]> {
    const params = new HttpParams().set('search', term);
    return this.http.get<Cliente[]>(`${this.endpoint}/search`, { params });
  }
}
