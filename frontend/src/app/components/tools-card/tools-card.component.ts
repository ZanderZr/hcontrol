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
   * URL de la imagen que se mostrará en la tarjeta.
   * @type {string}
   * @default 'book-solid.svg'
   */
  @Input() imageUrl: string = 'book-solid.svg';

  /**
   * Evento de salida que se emite cuando se hace clic en la tarjeta.
   * @type {EventEmitter<void>}
   */
  @Output() cardClick = new EventEmitter<void>(); // Evento de salida

  /**
   * Maneja el clic en la tarjeta y emite el evento `cardClick`.
   */
  onCardClick() {
    this.cardClick.emit();
  }
}
