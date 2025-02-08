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

 @Output() cardClick = new EventEmitter<void>(); // Evento de salida
 @Output() clickAdd = new EventEmitter<void>(); // Evento de salida

 @Input() exercise!:Exercise;

  onCardClick() {
    this.cardClick.emit();
  }

  onClickAdd() {
    this.clickAdd.emit();
  }
}

