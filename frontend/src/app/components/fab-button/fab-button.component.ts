import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent {
  
 /**
   * Evento de salida que se emite cuando se hace clic en el botón flotante.
   * @type {EventEmitter<void>}
   */
 @Output() fabClick = new EventEmitter<void>(); // Evento de salida

 /**
  * Entrada del componente que recibe el ícono que se mostrará en el botón.
  * @type {string}
  */
 @Input() icon!: string;

 /**
  * Maneja el clic en el botón flotante y emite el evento `fabClick`.
  */
 onFabClick() {
   this.fabClick.emit();
 }

}
