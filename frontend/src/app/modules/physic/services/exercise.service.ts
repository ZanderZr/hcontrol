import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';
  private apiKey = 'ekx4gD6BRZPNLSdCUeh3Cg==z7uhFAMgOknRmlVi'; // Reemplaza con tu clave API


  constructor(private http: HttpClient) {}

  getExercises(muscle: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?muscle=${muscle}`, {
      headers: { 'X-Api-Key': this.apiKey },
    });
  }
}
