import { Component } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { ToolsCardComponent } from '../../../components/tools-card/tools-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physic-page',
  standalone: true,
  imports: [PageComponent, ToolsCardComponent],
  templateUrl: './physic-page.component.html',
  styleUrl: './physic-page.component.scss',
})
export class PhysicPageComponent {
  
  /**
   * Constructor que inicializa el componente con los servicios necesarios.
   * @param {Router} router - Servicio de enrutamiento para manejar la navegación entre rutas.
   */
  constructor(private router: Router) {}

  /**
   * Navega a la página de registros de actividades físicas.
   * @returns {void} No devuelve nada, simplemente realiza la navegación.
   */
  recordsClick(): void {
    this.router.navigate(['/physic/records']);
  }

  /**
   * Navega a la página de rutinas físicas.
   * @returns {void} No devuelve nada, simplemente realiza la navegación.
   */
  routineClick(): void {
    this.router.navigate(['/physic/routine']);
  }
}
