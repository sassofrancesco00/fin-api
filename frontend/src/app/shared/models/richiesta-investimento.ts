import {User} from './user';
import {Cliente} from './cliente';
import {NotaInterna} from './nota-interna';

export interface RichiestaInvestimento {
  id?: number;
  clienteId: number;
  cliente?: Cliente;
  userId: number;
  user?: User;
  importo: number;
  tipoInvestimento: 'Azioni' | 'Obbligazioni' | 'ETF';
  dataInserimento: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  motivazioneRespinta?: string;
  noteInterne?: NotaInterna[];
}
