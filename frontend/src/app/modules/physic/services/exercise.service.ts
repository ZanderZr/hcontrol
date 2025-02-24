import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';
  private apiKey = 'ekx4gD6BRZPNLSdCUeh3Cg==z7uhFAMgOknRmlVi'; // Reemplaza con tu clave API


  constructor(private http: HttpClient) {}

  // Método para obtener ejercicios filtrados
  getFilteredExercises(filters: { type: string, muscle: string, difficulty: string }): Observable<any[]> {
    let query = '';

    // Añadimos los filtros a la query, asegurándonos de que solo se agreguen los filtros definidos
    if (filters.type) query += `&type=${filters.type}`;
    if (filters.muscle) query += `&muscle=${filters.muscle}`;
    if (filters.difficulty) query += `&difficulty=${filters.difficulty}`;

    return this.http.get<any[]>(`${this.apiUrl}?${query}`, {
      headers: {
        'X-Api-Key': this.apiKey,  // Coloca tu API Key aquí si es necesario
      }
    });
  }

  getExercisesByNames(names: string[]): Observable<any[]> {
    const types = [
      'cardio',
      'olympic_weightlifting',
      'plyometrics',
      'powerlifting',
      'strength',
      'stretching',
      'strongman'
    ];

    const requests = types.map(type =>
      this.http.get<any[]>(`${this.apiUrl}?type=${type}`, {
        headers: new HttpHeaders({ 'X-Api-Key': this.apiKey })
      })
    );

    return forkJoin(requests).pipe(
      map(responses => {
        const allExercises = responses.flat(); // Unir todas las respuestas en un solo array
        return allExercises.filter(exercise =>
          names.some(name => name.toLowerCase().trim() === exercise.name.toLowerCase().trim())
        );
      })
    );
  }

}
