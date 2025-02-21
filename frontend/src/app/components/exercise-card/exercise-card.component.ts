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

  @Output() cardClick = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta
  @Output() clickAdd = new EventEmitter<string>();

  @Input() exercise!: Exercise;

  isSelected = false; // Controla si el botón ha sido pulsado

  onCardClick() {
    this.cardClick.emit();
  }

  onClickAdd(name : string) {
    this.isSelected = !this.isSelected; // Cambia el estado
    this.clickAdd.emit(name); // Emite el ID del ejercicio al padre
  }
}
