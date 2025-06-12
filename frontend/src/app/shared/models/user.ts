export interface User {
  id: number;
  nome: string;
  email: string;
  ruolo: 'CONSULENTE' | 'SUPERVISORE';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
