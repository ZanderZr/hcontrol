import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/users/login`, { email, password }).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.isLoggedSubject.next(true);
      })
    );
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

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
