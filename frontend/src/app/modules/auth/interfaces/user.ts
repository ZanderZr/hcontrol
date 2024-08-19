// Define el enum para los roles posibles
export enum UserRole {
  COACH = 'COACH',
  DIETITIST = 'DIETITIST',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  DEVELOPER = 'DEVELOPER',
}

// Define la interfaz para el usuario
export interface User {
  id?: number;
  email: string;
  username?: string;
  password: string;
  role?: UserRole;
}
