import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../../modules/feeding/interfaces/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

/**
   * Evento de salida que se emite cuando se hace clic en la tarjeta.
   * @type {EventEmitter<void>}
   */
@Output() cardClick = new EventEmitter<void>(); // Evento de salida

/**
 * Evento de salida que se emite cuando se hace clic en el botón de agregar.
 * @type {EventEmitter<void>}
 */
@Output() clickAdd = new EventEmitter<void>(); // Evento de salida

/**
 * Entrada del componente que recibe el título que se mostrará en la tarjeta.
 * @type {string}
 */
@Input() title!: string;

/**
 * Entrada del componente que recibe la URL de la imagen que se mostrará en la tarjeta.
 * @type {string}
 */
@Input() img!: string;

/**
 * Maneja el clic en la tarjeta y emite el evento `cardClick`.
 */
onCardClick() {
  this.cardClick.emit();
}

/**
 * Maneja el clic en el botón de agregar y emite el evento `clickAdd`.
 */
onClickAdd() {
  this.clickAdd.emit();
}
}
