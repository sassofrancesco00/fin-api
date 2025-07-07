import { Cliente } from "./cliente";
import { StatoPratica } from "./stato-pratica";
import { User } from "./user";

export interface Richiesta {
  id?: number;
  cliente: Cliente;
  user: User;
  dataInserimento: Date;
  stato: StatoPratica;
  motivazioneRespinta?: string;
}