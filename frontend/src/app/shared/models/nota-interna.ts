import {User} from './user';

export interface NotaInterna {
  id?: number;
  richiestaId?: number;
  polizzaId?: number;
  autoreId: number;
  autore?: User;
  testo: string;
  dataCreazione: Date;
}
