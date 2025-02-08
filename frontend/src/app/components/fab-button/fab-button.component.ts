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
  @Output() fabClick = new EventEmitter<void>(); // Evento de salida
  @Input() icon!: string;

  onFabClick() {
    this.fabClick.emit();
  }
}
