import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentTest } from '../../../environments/environment';
import { RichiestaInvestimento } from '../models/richiesta-investimento';
import { PolizzaAssicurativa } from '../models/polizza';
import { Cliente } from '../models/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environmentTest.apiUrlLocal}`;

  constructor(private http: HttpClient) {}

  // Cliente endpoints
  getAllClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clienti`);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clienti/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clienti`, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clienti/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clienti/${id}`);
  }

  // Richieste Investimento endpoints
  getAllRichiesteInvestimento(): Observable<RichiestaInvestimento[]> {
    return this.http.get<RichiestaInvestimento[]>(`${this.apiUrl}/richieste-investimento`);
  }

  getRichiesteInvestimentoByClienteId(clienteId: number): Observable<RichiestaInvestimento[]> {
    return this.http.get<RichiestaInvestimento[]>(`${this.apiUrl}/richieste-investimento/cliente/${clienteId}`);
  }

  getRichiesteInvestimentoByConsulenteId(consulenteId: number): Observable<RichiestaInvestimento[]> {
    return this.http.get<RichiestaInvestimento[]>(`${this.apiUrl}/richieste-investimento/consulente/${consulenteId}`);
  }

  // Polizze endpoints
  getAllPolizze(): Observable<PolizzaAssicurativa[]> {
    return this.http.get<PolizzaAssicurativa[]>(`${this.apiUrl}/polizze`);
  }

  getPolizzeByClienteId(clienteId: number): Observable<PolizzaAssicurativa[]> {
    return this.http.get<PolizzaAssicurativa[]>(`${this.apiUrl}/polizze/cliente/${clienteId}`);
  }

  // Utility endpoints
  getClientiStats(): Observable<{
    totalClienti: number;
    clientiAttivi: number;
    clientiConInvestimenti: number;
    clientiConPolizze: number;
  }> {
    return this.http.get<{
      totalClienti: number;
      clientiAttivi: number;
      clientiConInvestimenti: number;
      clientiConPolizze: number;
    }>(`${this.apiUrl}/clienti/stats`);
  }
}
