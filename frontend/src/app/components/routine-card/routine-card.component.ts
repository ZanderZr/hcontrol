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
  @Input() imageUrl: string = 'book-solid.svg';
  @Output() cardClick = new EventEmitter<void>(); // Evento de salida
  @Output() deleteClick = new EventEmitter<void>(); // Evento de salida
  @Output() editClick = new EventEmitter<void>(); // Evento de salida

  onCardClick() {
    this.cardClick.emit();
    console.log("Card")

  }

  onDelete(event: MouseEvent){
    event.stopPropagation(); // Esto evita que el clic se propague a la tarjeta
    console.log("Delete")
  }

  onEdit(event: MouseEvent){
    event.stopPropagation(); // Esto evita que el clic se propague a la tarjeta
    console.log("Edit")
  }
}
