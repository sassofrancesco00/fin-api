import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotaInterna} from '../models/nota-interna';
import {ApiResponse} from '../models/api-response';
import {environmentTest} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotaInternaService {
  private readonly endpoint = `${environmentTest.apiUrlLocal}/note-interne`;

  constructor(private http: HttpClient) {
  }

  getNoteByRichiesta(richiestaId: number): Observable<NotaInterna[]> {
    return this.http.get<NotaInterna[]>(`${this.endpoint}/richiesta/${richiestaId}`);
  }

  getNoteByPolizza(polizzaId: number): Observable<NotaInterna[]> {
    return this.http.get<NotaInterna[]>(`${this.endpoint}/polizza/${polizzaId}`);
  }

  createNota(nota: NotaInterna): Observable<ApiResponse<NotaInterna>> {
    return this.http.post<ApiResponse<NotaInterna>>(this.endpoint, nota);
  }

  updateNota(id: number, nota: NotaInterna): Observable<ApiResponse<NotaInterna>> {
    return this.http.put<ApiResponse<NotaInterna>>(`${this.endpoint}/${id}`, nota);
  }

  deleteNota(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }
}
