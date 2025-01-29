import { Exercise } from "./exercise";

export interface Routine {
  idUser: string;
  name: string;
  activities: Exercise[];
  maxWeight?: number;
  maxRep?:number;
  execTime?:number;
}
