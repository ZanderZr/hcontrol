import { UserRole } from './../../modules/auth/interfaces/user';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../modules/auth/interfaces/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {


  /**
   * Almacena el botón seleccionado.
   * @type {any}
   */
  selectedButton: any;

  /**
   * Indica si el botón de "Feeding" está activo.
   * @type {boolean | undefined}
   */
  isFeedingButtonActive: boolean | undefined;

  /**
   * Indica si el botón de "Physic" está activo.
   * @type {boolean | undefined}
   */
  isPhysicButtonActive: boolean | undefined;

  /**
   * Indica si el botón de "Mental" está activo.
   * @type {boolean | undefined}
   */
  isMentalButtonActive: boolean | undefined;

  /**
   * Indica si el botón de "Home" está activo.
   * @type {boolean | undefined}
   */
  isHomeButtonActive: boolean | undefined;

  /**
   * Constructor que inyecta el servicio Router para la navegación.
   * @param router - Instancia del servicio Router para navegar entre rutas.
   */
  constructor(private router: Router) {}

  /**
   * Navega a la sección "mental" y activa el botón correspondiente.
   * Desactiva los demás botones.
   */
  mentalButton() {
    this.router.navigate(['mental']);
    this.setButtonFalse();
    this.isMentalButtonActive = true;
  }

  /**
   * Navega a la sección "feeding" y activa el botón correspondiente.
   * Desactiva los demás botones.
   */
  feedingButton() {
    this.router.navigate(['feeding']);
    this.setButtonFalse();
    this.isFeedingButtonActive = true;
  }

  /**
   * Navega a la sección "physic" y activa el botón correspondiente.
   * Desactiva los demás botones.
   */
  physicButton() {
    this.router.navigate(['physic']);
    this.setButtonFalse();
    this.isPhysicButtonActive = true;
  }

  /**
   * Navega a la sección "home" y activa el botón correspondiente.
   * Desactiva los demás botones.
   */
  homeButton() {
    this.router.navigate(['home']);
    this.setButtonFalse();
    this.isHomeButtonActive = true;
  }

  /**
   * Desactiva todos los botones de sección.
   */
  setButtonFalse() {
    this.isMentalButtonActive = false;
    this.isFeedingButtonActive = false;
    this.isPhysicButtonActive = false;
    this.isHomeButtonActive = false;
  }
}
