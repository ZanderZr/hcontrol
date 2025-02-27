import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      map(isLogged => {
        const isAuthRoute = route.routeConfig?.path === 'auth';
        if (isLogged && isAuthRoute) {
          this.router.navigate(['/home']); // Redirigir si intenta acceder a /auth ya autenticado
          return false;
        } else if (!isLogged && !isAuthRoute) {
          this.router.navigate(['/main']); // Redirigir si intenta acceder a rutas protegidas sin estar autenticado
          return false;
        }
        return true;
      })
    );
  }
}
