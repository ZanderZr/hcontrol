import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaryData } from '../modules/mental/interfaces/diary-data';
import { Exercise } from '../modules/physic/interfaces/exercise';
import { Routine } from '../modules/physic/interfaces/routine';
import { Board } from '../modules/home/interfaces/board';
import { Notification } from '../modules/auth/interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  /**
   * Constructor del servicio ApiService.
   * @param http - Instancia del servicio HttpClient para hacer peticiones HTTP.
   */
  constructor(private http: HttpClient) {}

  /* ------------------ Diary ------------------ */

  /**
   * Obtiene todos los registros del diario de un usuario.
   * @param id - ID del usuario.
   * @returns Un observable con la lista de registros del diario.
   */
  getAllDiary(id: number): Observable<DiaryData[]> {
    return this.http.get<DiaryData[]>(`${this.apiUrl}/diary/${id}`);
  }

  /**
   * Obtiene un registro del diario por su ID.
   * @param id - ID del registro del diario.
   * @returns Un observable con los detalles del registro del diario.
   */
  getDiary(id: number): Observable<DiaryData> {
    return this.http.get<DiaryData>(`${this.apiUrl}/diary/${id}`);
  }

  /**
   * Crea un nuevo registro en el diario.
   * @param diary - Objeto que contiene los datos del nuevo registro.
   * @returns Un observable con el registro creado.
   */
  postDiary(diary: DiaryData): Observable<DiaryData> {
    return this.http.post<DiaryData>(`${this.apiUrl}/diary`, diary);
  }

  /**
   * Elimina un registro del diario por su ID.
   * @param id - ID del registro a eliminar.
   * @returns Un observable que indica el éxito o fracaso de la eliminación.
   */
  deleteDiary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/diary/${id}`);
  }

  /* ------------------ Routine ------------------ */

  /**
   * Obtiene todas las rutinas de un usuario.
   * @param id - ID del usuario.
   * @returns Un observable con la lista de rutinas del usuario.
   */
  getAllRoutine(id: number): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiUrl}/routines/${id}`);
  }

  /**
   * Obtiene los detalles de una rutina específica por su ID.
   * @param id - ID de la rutina.
   * @returns Un observable con los detalles de la rutina.
   */
  getRoutine(id: number): Observable<Routine> {
    return this.http.get<Routine>(`${this.apiUrl}/routines/details/${id}`);
  }

  /**
   * Crea una nueva rutina.
   * @param routine - Objeto que contiene los datos de la nueva rutina.
   * @returns Un observable con la rutina creada.
   */
  postRoutine(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(`${this.apiUrl}/routines`, routine);
  }

  /**
   * Actualiza una rutina existente.
   * @param id - ID de la rutina a actualizar.
   * @param routine - Objeto con los nuevos datos de la rutina.
   * @returns Un observable con la rutina actualizada.
   */
  putRoutine(id: number, routine: Routine): Observable<Routine> {
    return this.http.put<Routine>(`${this.apiUrl}/routines/${id}`, routine);
  }

  /**
   * Elimina una rutina por su ID.
   * @param id - ID de la rutina a eliminar.
   * @returns Un observable que indica el éxito o fracaso de la eliminación.
   */
  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/routines/${id}`);
  }

  /* ------------------ Exercise ------------------ */

  /**
   * Obtiene todos los ejercicios de un usuario.
   * @param id - ID del usuario.
   * @returns Un observable con la lista de ejercicios del usuario.
   */
  getAllExercise(id: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises/${id}`);
  }

  /**
   * Obtiene los detalles de un ejercicio específico por su ID.
   * @param id - ID del ejercicio.
   * @returns Un observable con los detalles del ejercicio.
   */
  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/exercises/${id}`);
  }

  /**
   * Crea un nuevo ejercicio.
   * @param exercise - Objeto que contiene los datos del nuevo ejercicio.
   * @returns Un observable con el ejercicio creado.
   */
  postExercise(exercise: Exercise): Observable<Exercise> {
    console.log(exercise);
    return this.http.post<Exercise>(`${this.apiUrl}/exercises`, exercise);
  }

  /**
   * Actualiza un ejercicio existente.
   * @param id - ID del ejercicio a actualizar.
   * @param exercise - Objeto con los nuevos datos del ejercicio.
   * @returns Un observable con el ejercicio actualizado.
   */
  putExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/exercises/${id}`, exercise);
  }

  /**
   * Elimina un ejercicio por su ID.
   * @param id - ID del ejercicio a eliminar.
   * @returns Un observable que indica el éxito o fracaso de la eliminación.
   */
  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/exercises/${id}`);
  }

  /* ------------------ Boards ------------------ */

  /**
   * Obtiene todos los boards disponibles.
   * @returns Un observable con la lista de boards.
   */
  getAllBoard(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/boards`);
  }

  /**
   * Crea un nuevo board.
   * @param board - Objeto que contiene los datos del nuevo board.
   * @returns Un observable con el board creado.
   */
  postBoard(board: Board): Observable<Board> {
    console.log(board);
    return this.http.post<Board>(`${this.apiUrl}/boards`, board);
  }

  /* ------------------ Notifications ------------------ */

  /**
   * Obtiene todas las notificaciones de un receptor específico.
   * @param idReceiver - ID del receptor de las notificaciones.
   * @returns Un observable con la lista de notificaciones.
   */
  getAllNotifications(idReceiver: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.apiUrl}/notifications/${idReceiver}`
    );
  }

  /**
   * Crea una nueva notificación.
   * @param notification - Objeto que contiene los datos de la nueva notificación.
   * @returns Un observable con la notificación creada.
   */
  postNotification(notification: Notification): Observable<Notification> {
    console.log(notification);
    return this.http.post<Notification>(
      `${this.apiUrl}/notifications`,
      notification
    );
  }

  /**
   * Elimina una notificación por su ID.
   * @param id - ID de la notificación a eliminar.
   * @returns Un observable que indica el éxito o fracaso de la eliminación.
   */
  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notifications/${id}`);
  }
}
