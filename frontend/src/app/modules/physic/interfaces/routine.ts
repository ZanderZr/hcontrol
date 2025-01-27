import { Activity } from "./activity";

export interface Routine {
  idUser: string;
  activities: Activity[];
  maxWeight?: number;
  maxRep?:number;
  execTime?:number;
}
