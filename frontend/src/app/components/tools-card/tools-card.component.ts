import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tools-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './tools-card.component.html',
  styleUrls: ['./tools-card.component.scss']
})
export class ToolsCardComponent {
  @Input() title: string = 'Card Title';
  @Input() description: string = 'This is a brief description of the content.';
  @Input() imageUrl: string = 'book-solid.svg'; // URL de una imagen de ejemplo
  @Output() cardClick = new EventEmitter<void>(); // Evento de salida

  onCardClick() {
    // Puedes agregar aquí la lógica que necesites al hacer clic en el card
    console.log('Card clicked!');
  }
}
