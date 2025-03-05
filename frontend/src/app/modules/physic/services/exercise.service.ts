import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';
  private apiKey = 'ekx4gD6BRZPNLSdCUeh3Cg==z7uhFAMgOknRmlVi';

  constructor(private http: HttpClient) {}

  /**
   * Método para obtener ejercicios filtrados por tipo, músculo y dificultad.
   * @param filters - Un objeto que contiene los filtros para los ejercicios.
   * @param filters.type - El tipo de ejercicio (e.g. 'cardio', 'strength').
   * @param filters.muscle - El músculo objetivo (e.g. 'biceps', 'chest').
   * @param filters.difficulty - El nivel de dificultad (e.g. 'beginner', 'intermediate').
   * @returns {Observable<any[]>} - Un observable que emite el listado de ejercicios filtrados.
   */
  getFilteredExercises(filters: {
    type: string;
    muscle: string;
    difficulty: string;
  }): Observable<any[]> {
    let query = '';

    // Añadimos los filtros a la query, asegurándonos de que solo se agreguen los filtros definidos
    if (filters.type) query += `&type=${filters.type}`;
    if (filters.muscle) query += `&muscle=${filters.muscle}`;
    if (filters.difficulty) query += `&difficulty=${filters.difficulty}`;

    return this.http.get<any[]>(`${this.apiUrl}?${query}`, {
      headers: {
        'X-Api-Key': this.apiKey, // Coloca tu API Key aquí si es necesario
      },
    });
  }

  /**
   * Método para obtener ejercicios basados en sus nombres.
   * Realiza peticiones a la API para obtener ejercicios de diferentes tipos y músculos, y luego filtra los resultados.
   * @param names - Un array de nombres de ejercicios a buscar.
   * @returns {Observable<any[]>} - Un observable que emite el listado de ejercicios encontrados.
   */
  getExercisesByNames(names: string[]): Observable<any[]> {
    const types = [
      'cardio',
      'olympic_weightlifting',
      'plyometrics',
      'powerlifting',
      'strength',
      'stretching',
      'strongman',
    ];

    const muscles = [
      'abdominals',
      'abductors',
      'adductors',
      'biceps',
      'calves',
      'chest',
      'forearms',
      'glutes',
      'hamstrings',
      'lats',
      'lower_back',
      'middle_back',
      'neck',
      'quadriceps',
      'traps',
      'triceps',
    ];

    // Crear peticiones para tipos de ejercicios
    const typeRequests = types.map((type) =>
      this.http.get<any[]>(`${this.apiUrl}?type=${type}`, {
        headers: new HttpHeaders({ 'X-Api-Key': this.apiKey }),
      })
    );

    // Crear peticiones para músculos
    const muscleRequests = muscles.map((muscle) =>
      this.http.get<any[]>(`${this.apiUrl}?muscle=${muscle}`, {
        headers: new HttpHeaders({ 'X-Api-Key': this.apiKey }),
      })
    );

    // Ejecutar todas las peticiones en paralelo
    return forkJoin([...typeRequests, ...muscleRequests]).pipe(
      map((responses) => {
        console.log('API Responses:', responses); // 🔍 Debug

        // Unir todas las respuestas en un solo array
        const allExercises = responses.flatMap((response) => response || []);
        console.log('Total de ejercicios obtenidos:', allExercises.length);

        // Eliminar duplicados (basado en el nombre del ejercicio)
        const uniqueExercises = Array.from(
          new Map(
            allExercises.map((ex) => [ex.name.toLowerCase().trim(), ex])
          ).values()
        );

        // Filtrar solo los ejercicios que están en el array `names`
        return uniqueExercises.filter((exercise) =>
          names.some((name) =>
            exercise.name.toLowerCase().includes(name.toLowerCase().trim())
          )
        );
      })
    );
  }
}
