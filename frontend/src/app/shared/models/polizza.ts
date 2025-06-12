import {User} from './user';
import {Cliente} from './cliente';
import {NotaInterna} from './nota-interna';

export interface PolizzaAssicurativa {
  id?: number;
  clienteId: number;
  cliente?: Cliente;
  userId: number;
  user?: User;
  tipoPolizza: 'Vita' | 'Infortuni' | 'RC_Auto' | 'Casa';
  premio: number;
  dataInizio: Date;
  dataScadenza: Date;
  stato: 'in_revisione' | 'Approvata' | 'Respinta';
  motivazioneRespinta?: string;
  noteInterne?: NotaInterna[];
}
