export interface Exercise {
  difficulty?: string;
  equipment?: string;
  instructions?: string;
  muscle?: string;
  name: string;
  type?: string;
  max_weight?: number;
  max_rep?:number;
  exec_time?:number;
  idUser:number;
}
