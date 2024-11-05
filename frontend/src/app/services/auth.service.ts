import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../modules/auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;
  private refreshNavbarSubject = new Subject<void>();

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/'
  }

  // La función tap de RxJS se usa para realizar efectos secundarios, en este caso, establecer el token, sin alterar el flujo del observable.
  login(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}login`, user).pipe(
      tap((response: any) => {
        this.setToken(response.token);
      })
    );
  }
  register(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}register`, user);
  }

  setToken(token: string) {
    const tokenData = JSON.stringify({ token, expiry: Date.now() + 36000000 }); // Establece el token y la fecha de expiración (1 hora)
    this.cookies.set("token", tokenData);
    this.refreshNavbarSubject.next(); // Emisor
  }


  getToken() {
    const tokenData = this.cookies.get("token");
    if (tokenData) {
      const { token, expiry } = JSON.parse(tokenData);
      // Verificar si el token ha expirado
      if (Date.now() < expiry) {
        return token; // Devuelve el token si no ha expirado
      } else {
        this.logout(); // Si el token ha expirado, cierra la sesión
        return null;
      }
    }
    return null;
  }


  getUser(): Observable<any> {
    const token = this.getToken();
    if (token) {
      return this.http.get(`${this.myAppUrl}${this.myApiUrl}token`, {
        headers: {
          'Authorization': `Bearer ${token}` // Envía el token en el encabezado Authorization
        }
      });
    } else {
      console.error('No se proporcionó ningún token');
      return of(null);
    }
  }


  logout() {
    this.cookies.delete('token');
    this.refreshNavbarSubject.next(); // Emisor
  }

  /*
  El getter refreshNavbar$ en el UsersService es una propiedad de solo lectura que devuelve un Observable
  de tipo void. Este Observable se emite cada vez que se llama a this.refreshNavbarSubject.next(). El propósito
  de este observable es permitir que otros componentes se suscriban a él para recibir notificaciones cuando se
  debe actualizar la interfaz de usuario, como después de un inicio o cierre de sesión.
  */
  get refreshNavbar$(): Observable<void> {
    return this.refreshNavbarSubject.asObservable();
  }

}
