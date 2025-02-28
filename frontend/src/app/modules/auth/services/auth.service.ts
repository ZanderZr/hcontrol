import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  user: any;
  private isLoggedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLogged$ = this.isLoggedSubject.asObservable();

  idUser!:number
  constructor(
    private http: HttpClient,
    private _apiService: ApiService
  ) {

  }


  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/users/login`, { email, password }).pipe(
      tap(response => {
        this.saveUserData(response.user); // 🔥 Guardar los datos del usuario
        this.isLoggedSubject.next(true);
      })
    );
  }

  saveUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  register(email: string, username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { email, username, password, role });
  }

  getProtectedData(): Observable<any> {
    const token = this.getToken();
    if (!token) return new Observable(observer => observer.error('No token found'));

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/protected`, { headers });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  saveToken(token: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('authToken', token); // Guarda en localStorage para persistencia
    } else {
      sessionStorage.setItem('authToken', token); // Solo mantiene la sesión activa hasta que se cierre el navegador
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData'); // 🔥 Eliminar los datos del usuario al cerrar sesión
    this.isLoggedSubject.next(false);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
