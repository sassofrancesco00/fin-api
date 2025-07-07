import {User} from './user';
import {Cliente} from './cliente';
import {NotaInterna} from './nota-interna';
import { Investimento } from './investimento';
import { Richiesta } from './richiesta';

export interface RichiestaInvestimento {
  id?: number;
  richiesta: Richiesta;
  investimento: Investimento;
  importo: number;
  dataInserimento: Date;
  dataModifica: Date;
  stato: string;
  motivazioneRespinta?: string;
  consulenteId: number; // user.id dalla richiesta
}

