// src/app/shared/models/user.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  ruolo: string; // Mantieni la struttura che hai già
  role: string;
}

///TODO MOCK
// export interface User {
//   id: number;
//   nome: string;
//   cognome: string
//   email: string;
//   ruolo: 'CONSULENTE' | 'SUPERVISORE';
// }
//
// export interface LoginRequest {
//   email: string;
//   password: string;
// }
//
// export interface LoginResponse {
//   token: string;
//   user: User;
// }
