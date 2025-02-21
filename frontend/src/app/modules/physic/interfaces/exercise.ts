export interface Exercise {
  difficulty?: string;
  equipment?: string;
  instructions?: string;
  muscle?: string;
  name: string;
  type?: string;
  maxWeight?: number;
  maxRep?:number;
  execTime?:number;
  idUser:number;
}
