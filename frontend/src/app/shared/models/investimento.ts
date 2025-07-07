import { LivelloRischio } from "./livello-rischio";
import { TipoInvestimento } from "./tipo-investimento";

export interface Investimento {
  id?: number;
  tipo: TipoInvestimento;
  nomeStrumento: string;
  rischio: LivelloRischio;
  rendimentoMedioAtteso?: number;
}