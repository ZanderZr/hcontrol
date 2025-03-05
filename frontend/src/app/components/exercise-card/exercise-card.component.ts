import { MatExpansionModule } from '@angular/material/expansion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Exercise } from '../../modules/physic/interfaces/exercise';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent {

  /**
   * Evento de salida que emite cuando se hace clic en la tarjeta.
   * @type {EventEmitter<void>}
   */
  @Output() cardClick = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta

  /**
   * Evento de salida que emite el nombre del ejercicio cuando se agrega.
   * @type {EventEmitter<string>}
   */
  @Output() clickAdd = new EventEmitter<string>();

  /**
   * Entrada del componente que recibe el objeto 'Exercise'.
   * @type {Exercise}
   */
  @Input() exercise!: Exercise;

  /**
   * Indicador de si la tarjeta está seleccionada o no.
   * @type {boolean}
   */
  isSelected = false; // Controla si el botón ha sido pulsado

  /**
   * Maneja el clic en la tarjeta y emite el evento `cardClick`.
   */
  onCardClick() {
    this.cardClick.emit();
  }

  /**
   * Maneja el clic en el botón de agregar ejercicio.
   * Cambia el estado de selección y emite el nombre del ejercicio al componente padre.
   * @param {string} name - El nombre del ejercicio que se está agregando.
   */
  onClickAdd(name: string) {
    this.isSelected = !this.isSelected; // Cambia el estado
    this.clickAdd.emit(name); // Emite el nombre del ejercicio al padre
  }
}
