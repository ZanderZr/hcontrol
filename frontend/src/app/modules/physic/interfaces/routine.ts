import { Exercise } from "./exercise";

export interface Routine {
  idUser: string;
  name: string;
  description?: string;
  exercises: Exercise[];
}
