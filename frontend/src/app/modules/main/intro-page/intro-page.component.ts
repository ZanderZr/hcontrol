import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {

  /**
   * Indica si el usuario está logueado o no.
   * @type {boolean}
   */
  isLogged: boolean = false;

  /**
   * Controla si se está realizando la animación de navegación.
   * @type {boolean}
   */
  isNavigating = false;

  /**
   * Constructor que inyecta el servicio de enrutador.
   * @param {Router} router - Servicio de enrutamiento para navegar entre rutas.
   */
  constructor(private router: Router) {}

  /**
   * Maneja el clic en el botón del logo.
   * Activa la animación de disolución y navega a la ruta correspondiente según si el usuario está logueado o no.
   */
  logoButton() {
    // Activa la animación de disolución
    this.isNavigating = true;

    // Navega a la nueva ruta después de la animación
    setTimeout(() => {
      // Si el usuario no está logueado, navega a la página de autenticación
      if (!this.isLogged) {
        this.router.navigate(['auth']);
      } else {
        // Si el usuario está logueado, navega a la página principal
        this.router.navigate(['main']);
      }
    }, 500); // Asegúrate de que el tiempo coincide con la duración de la animación
  }
}
