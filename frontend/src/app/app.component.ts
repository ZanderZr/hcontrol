import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthService } from './modules/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    CommonModule]
})
export class AppComponent {
  title = 'HControl';

  isLogged: boolean = false;  // Estado de autenticación del usuario
  currentRoute: string = '';  // Ruta actual que el usuario está visitando
  private protectedRoutes = ['/auth', '/main', '/verify-email']; // Rutas protegidas que necesitan autenticación

  /**
   * Constructor del componente AppComponent.
   * @param authService - Servicio de autenticación utilizado para verificar el estado de inicio de sesión.
   * @param router - Servicio de enrutamiento utilizado para gestionar las rutas y sus cambios.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se suscribe al estado de inicio de sesión y escucha cambios de ruta.
   */
  ngOnInit() {
    // Suscripción al observable isLogged$ para obtener el estado de inicio de sesión
    this.authService.isLogged$.subscribe(status => {
      this.isLogged = status; // Actualiza el estado de isLogged según el observable
    });

    // Escuchar cambios de ruta y actualizar la ruta actual
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) // Filtra solo eventos de tipo NavigationEnd
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects; // Actualiza la ruta actual después de la redirección
      });
  }

  /**
   * Verifica si la ruta actual es una ruta protegida.
   * @returns {boolean} - Devuelve true si la ruta actual es protegida, de lo contrario false.
   */
  isProtectedRoute(): boolean {
    return this.protectedRoutes.some(route => this.currentRoute.includes(route)); // Verifica si la ruta actual está en la lista de rutas protegidas
  }
}
