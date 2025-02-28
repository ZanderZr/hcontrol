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

  @Input() notification!: Notification;
  @Output() clickCard = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta
  @Output() clickTrash = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta

  onClickCard(){
    this.clickCard.emit();
  }
  onClickTrash(event: Event) {
    event.stopPropagation(); // ⛔ Evita que el clic se propague al div padre
    this.clickTrash.emit();
  }

}
