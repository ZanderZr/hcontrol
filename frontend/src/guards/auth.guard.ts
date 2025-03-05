import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor de la guardia de rutas AuthGuard.
   * @param authService - Servicio de autenticación para verificar el estado de inicio de sesión.
   * @param router - Servicio de enrutamiento para redirigir al usuario a otras rutas según su estado de autenticación.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método que determina si el usuario puede acceder a una ruta.
   * Redirige al usuario si no está autenticado o si está autenticado intentando acceder a la ruta de autenticación.
   * @param route - Información sobre la ruta solicitada.
   * @returns {Observable<boolean>} - Observable que emite un valor booleano indicando si el usuario puede acceder a la ruta.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      map((isLogged) => {
        // Verifica si la ruta solicitada es la ruta de autenticación
        const isAuthRoute = route.routeConfig?.path === 'auth';

        // Si el usuario está autenticado y está intentando acceder a la ruta de autenticación, lo redirige a /home
        if (isLogged && isAuthRoute) {
          this.router.navigate(['/home']);
          return false; // No permite el acceso a la ruta
        }
        // Si el usuario no está autenticado y está intentando acceder a una ruta protegida, lo redirige a /main
        else if (!isLogged && !isAuthRoute) {
          this.router.navigate(['/main']);
          return false; // No permite el acceso a la ruta
        }

        // Si la ruta es válida para el estado del usuario, permite el acceso
        return true;
      })
    );
  }
}
