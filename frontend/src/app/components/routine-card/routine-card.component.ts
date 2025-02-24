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
  @Input() title: string = 'Card Title';
  @Input() description: string = 'This is a brief description of the content.';
  @Output() cardClick = new EventEmitter<void>(); // Evento de salida
  @Output() deleteClick = new EventEmitter<void>(); // Evento de salida
  @Output() editClick = new EventEmitter<void>(); // Evento de salida
  @Input() exercisesNumber: number | undefined;

  onCardClick() {
    this.cardClick.emit();
    console.log("Card")

  }

  onDelete(event: MouseEvent){
    event.stopPropagation();
    this.deleteClick.emit(); // Emitir el evento cuando se hace clic en borrar
  }

  onEdit(event: MouseEvent){
    event.stopPropagation();
    this.editClick.emit(); // Emitir el evento cuando se hace clic en editar
  }

}
