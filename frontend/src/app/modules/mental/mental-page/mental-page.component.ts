import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { ToolsCardComponent } from '../../../components/tools-card/tools-card.component';

@Component({
  selector: 'app-mental-page',
  standalone: true,
  imports: [PageComponent, ToolsCardComponent],
  templateUrl: './mental-page.component.html',
  styleUrl: './mental-page.component.scss',
})
export class MentalPageComponent {
  
  /**
   * Constructor que inicializa el componente con el servicio de enrutamiento.
   * @param {Router} router - Servicio de enrutamiento para manejar la navegación entre rutas.
   */
  constructor(private router: Router) {}

  /**
   * Navega a la página del diario cuando se hace clic en el botón correspondiente.
   * @returns {void} No devuelve nada, simplemente realiza la navegación.
   */
  diaryClick(): void {
    this.router.navigate(['/mental/diary']);
  }

  /**
   * Navega a la página de respiración cuando se hace clic en el botón correspondiente.
   * @returns {void} No devuelve nada, simplemente realiza la navegación.
   */
  breathClick(): void {
    this.router.navigate(['/mental/breath']);
  }
}
