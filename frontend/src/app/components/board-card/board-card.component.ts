import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../modules/home/interfaces/board';
import { UserRole } from '../../modules/auth/interfaces/user';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss'
})

export class BoardCardComponent implements OnInit{

 /**
   * Entrada del componente que recibe el objeto 'Board'.
   * @type {Board}
   */
 @Input() board!: Board;

 /**
  * Evento de salida que emite un clic en la tarjeta.
  * @type {EventEmitter<void>}
  */
 @Output() clickBoard = new EventEmitter<void>(); // Evento de salida para clic en la tarjeta

 /**
  * URL de la imagen que se mostrará en la tarjeta.
  * @type {string}
  */
 imageUrl!: string;

 /**
  * Método llamado al inicializar el componente.
  * Asigna la URL de la imagen basada en el rol del usuario.
  */
 ngOnInit(): void {
   // Si el rol del usuario es 'COACH', asigna la URL de la imagen correspondiente.
   if (this.board.rolePro === UserRole.COACH) {
     this.imageUrl = "./assets/tool-icons/dumbbell-solid.svg";
   }
 }

 /**
  * Maneja el evento de clic en la tarjeta y emite el evento `clickBoard`.
  */
 onClickBoard() {
   this.clickBoard.emit();
 }
}
