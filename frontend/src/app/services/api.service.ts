import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaryData } from '../modules/mental/interfaces/diary-data';
import { Exercise } from '../modules/physic/interfaces/exercise';
import { Routine } from '../modules/physic/interfaces/routine';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  /* ------------------ Diary ------------------ */

  getAllDiary(): Observable<DiaryData[]> {
    return this.http.get<DiaryData[]>(this.apiUrl);
  }

  // Obtiene un registro del diario por su ID
  getDiary(id: number): Observable<DiaryData> {
    return this.http.get<DiaryData>(`${this.apiUrl}/diary/${id}`);
  }

  // Crea un nuevo registro en el diario
  postDiary(diary: DiaryData): Observable<DiaryData> {
    return this.http.post<DiaryData>(`${this.apiUrl}/diary`, diary);
  }

  // Elimina un registro del diario por su ID
  deleteDiary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/diary/${id}`);
  }

  /* ------------------ Routine ------------------ */

  // Obtiene todas las rutinas
  getAllRoutine(id:number): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiUrl}/routines/${id}`);
  }

  // Obtiene una rutina específica por su ID
  getRoutine(id: number): Observable<Routine> {
    return this.http.get<Routine>(`${this.apiUrl}/routines/details/${id}`);
  }

  // Crea una nueva rutina
  postRoutine(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(`${this.apiUrl}/routines`, routine);
  }

  // Actualiza una rutina existente
  putRoutine(id: number, routine: Routine): Observable<Routine> {
    return this.http.put<Routine>(`${this.apiUrl}/routines/${id}`, routine);
  }

  // Elimina una rutina por su ID
  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/routines/${id}`);
  }


  /* ------------------ Exercise ------------------ */

  // Obtiene todos los ejercicios
  getAllExercise(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  // Obtiene un ejercicio específico por su ID
  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/exercises/${id}`);
  }

  // Crea un nuevo ejercicio
  postExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/exercises`, exercise);
  }

  // Actualiza un ejercicio existente
  putExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/exercises/${id}`, exercise);
  }

  // Elimina un ejercicio por su ID
  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/exercises/${id}`);
  }


}
