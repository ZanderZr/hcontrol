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

  isLogged: boolean = false;
  isNavigating = false;

  constructor(private router: Router) {}

  logoButton() {
    this.isNavigating = true; // Activa la animación de disolución

    // Navegar a la nueva ruta después de la animación
    setTimeout(() => {
      if (!this.isLogged) {
        this.router.navigate(['auth']);
      } else {
        this.router.navigate(['main']);
      }
    }, 500); // Asegúrate de que el tiempo coincide con la duración de la animación
  }
}
