import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-routine-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './routine-card.component.html',
  styleUrl: './routine-card.component.scss'
})
export class RoutineCardComponent {

 /**
   * Título que se muestra en la tarjeta.
   * @type {string}
   * @default 'Card Title'
   */
  @Input() title: string = 'Card Title';

  /**
   * Descripción que se muestra en la tarjeta.
   * @type {string}
   * @default 'This is a brief description of the content.'
   */
  @Input() description: string = 'This is a brief description of the content.';

  /**
   * Evento de salida que se emite cuando se hace clic en la tarjeta.
   * @type {EventEmitter<void>}
   */
  @Output() cardClick = new EventEmitter<void>(); // Evento de salida

  /**
   * Evento de salida que se emite cuando se hace clic en el botón de eliminar.
   * @type {EventEmitter<void>}
   */
  @Output() deleteClick = new EventEmitter<void>(); // Evento de salida

  /**
   * Evento de salida que se emite cuando se hace clic en el botón de editar.
   * @type {EventEmitter<void>}
   */
  @Output() editClick = new EventEmitter<void>(); // Evento de salida

  /**
   * Número de ejercicios relacionados con la tarjeta.
   * @type {number | undefined}
   */
  @Input() exercisesNumber: number | undefined;

  /**
   * Maneja el clic en la tarjeta y emite el evento `cardClick`.
   * También imprime un mensaje en la consola cuando se hace clic en la tarjeta.
   */
  onCardClick() {
    this.cardClick.emit();
    console.log("Card");
  }

  /**
   * Maneja el clic en el botón de eliminar, evita la propagación del evento y emite el evento `deleteClick`.
   * @param {MouseEvent} event - El evento de clic en el botón de eliminar.
   */
  onDelete(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic se propague al contenedor de la tarjeta
    this.deleteClick.emit(); // Emitir el evento cuando se hace clic en borrar
  }

  /**
   * Maneja el clic en el botón de editar, evita la propagación del evento y emite el evento `editClick`.
   * @param {MouseEvent} event - El evento de clic en el botón de editar.
   */
  onEdit(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic se propague al contenedor de la tarjeta
    this.editClick.emit(); // Emitir el evento cuando se hace clic en editar
  }
}
