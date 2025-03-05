import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../modules/auth/interfaces/notification'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent {

/**
   * Entrada del componente que recibe un objeto de tipo `Notification`.
   * @type {Notification}
   */
@Input() notification!: Notification;

/**
 * Evento de salida que se emite cuando se hace clic en la tarjeta de la notificación.
 * @type {EventEmitter<void>}
 */
@Output() clickCard = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta

/**
 * Evento de salida que se emite cuando se hace clic en el ícono de la papelera de la notificación.
 * @type {EventEmitter<void>}
 */
@Output() clickTrash = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta

/**
 * Maneja el clic en la tarjeta de notificación y emite el evento `clickCard`.
 */
onClickCard() {
  this.clickCard.emit();
}

/**
 * Maneja el clic en el ícono de la papelera y emite el evento `clickTrash`.
 * Evita que el clic se propague al contenedor padre de la tarjeta.
 * @param {Event} event - El evento del clic en el ícono de la papelera.
 */
onClickTrash(event: Event) {
  event.stopPropagation(); // ⛔ Evita que el clic se propague al div padre
  this.clickTrash.emit();
}

}
