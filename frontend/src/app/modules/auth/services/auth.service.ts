import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,  Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Notification } from '../interfaces/notification';
import { ActivatedRoute, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * URL base de la API, tomada de la configuración del entorno.
   * @type {string}
   */
  private apiUrl = environment.apiUrl;

  /**
   * Almacena los datos del usuario actualmente autenticado.
   * @type {any}
   */
  user: any;

  /**
   * Controla el estado de la sesión del usuario (si está autenticado o no).
   * @type {BehaviorSubject<boolean>}
   */
  public isLoggedSubject = new BehaviorSubject<boolean>(this.hasToken());

  /**
   * Observable que emite el estado de autenticación del usuario.
   * @type {Observable<boolean>}
   */
  isLogged$ = this.isLoggedSubject.asObservable();

  private socket!: Socket;

  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  /**
   * Constructor del servicio, que inyecta dependencias necesarias como HttpClient.
   * @param {HttpClient} http - Servicio para realizar peticiones HTTP.
   */

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, private router: Router
  ) {
  }


  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/verify-email?token=${token}`);
  }

/*   handleRedirectLogin() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        // ✅ Validar antes de guardarlo
        if (this.isValidToken(token)) {
          this.saveToken(token, true);

          this.isLoggedSubject.next(true);
          this.router.navigate(['/dashboard']); // 🔥 Redirige a una página protegida
        } else {
          console.error('Token inválido');
          this.logout(); // 🔥 Elimina tokens inválidos
        }
      }
    });
  }
 */
/*   isValidToken(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000; // Tiempo actual en segundos
      return decoded.exp > now; // ✅ Comprobar si el token ha expirado
    } catch (error) {
      return false;
    }
  } */
/*
  loginWithGoogle(credential: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/google`, { credential }).pipe(
      tap((response) => {
        if (response.token) {
          console.log("A")
          localStorage.setItem('authToken', response.token);
          this.isLoggedSubject.next(true);
        }
      })
    );
  } */


  /**
   * Realiza la autenticación del usuario con las credenciales proporcionadas.
   * Si es exitosa, guarda los datos del usuario y el token.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Observable<any>} - Observable con los datos de respuesta.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/users/login`, { email, password }).pipe(
      tap(response => {
        this.saveUserData(response.user); // 🔥 Guardar los datos del usuario
        this.isLoggedSubject.next(true);
        this.socket = io(environment.apiUrlBase);

        this.socket.emit('register', response.user.id);

        // Escuchar las notificaciones entrantes
        this.socket.on('new_notification', (notification: Notification) => {
          this.addNotification(notification);  // Añadir la nueva notificación al array
        });
      })
    );
  }

  private addNotification(notification: Notification) {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]); // Añadir la notificación al array
  }

  /**
   * Obtiene un Observable de las notificaciones
   * @returns Observable que emite el array de notificaciones
   */
  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  deleteNotification(id: number) {
    const updatedNotifications = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  /**
   * Desconecta el socket cuando el usuario cierra sesión o la app se cierra
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  /**
   * Guarda los datos del usuario en el localStorage.
   * @param {any} user - Los datos del usuario a guardar.
   */
  saveUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * Realiza el registro de un nuevo usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} username - El nombre de usuario.
   * @param {string} password - La contraseña del usuario.
   * @param {string} role - El rol del usuario.
   * @returns {Observable<any>} - Observable con la respuesta del registro.
   */
  register(email: string, username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { email, username, password, role });
  }

  /**
   * Obtiene datos protegidos de la API, utilizando el token de autenticación.
   * Si no existe un token, emite un error.
   * @returns {Observable<any>} - Observable con los datos protegidos.
   */
  getProtectedData(): Observable<any> {
    const token = this.getToken();
    if (!token) return new Observable(observer => observer.error('No token found'));

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/protected`, { headers });
  }

  /**
   * Obtiene el token de autenticación desde localStorage o sessionStorage.
   * @returns {string | null} - El token de autenticación o null si no existe.
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  /**
   * Obtiene los datos del usuario desde el localStorage.
   * @returns {any} - Los datos del usuario o null si no existen.
   */
  getUserData(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('userData')) {
      return JSON.parse(localStorage.getItem('userData')!);
    }
    return null;
  }


  /**
   * Guarda el token de autenticación en localStorage o sessionStorage según el parámetro `rememberMe`.
   * @param {string} token - El token de autenticación a guardar.
   * @param {boolean} rememberMe - Determina si el token debe persistir entre sesiones.
   */
  saveToken(token: string, rememberMe: boolean) {
    if (typeof window !== 'undefined') {
      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
    }
  }

  /**
   * Cierra la sesión del usuario, eliminando el token y los datos del usuario almacenados.
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData'); // 🔥 Eliminar los datos del usuario al cerrar sesión
    this.isLoggedSubject.next(false);
  }

  /**
   * Verifica si hay un token de autenticación presente en el almacenamiento.
   * @returns {boolean} - Devuelve true si hay un token, de lo contrario false.
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }
}
