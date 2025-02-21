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

  @Output() cardClick = new EventEmitter<void>(); // Evento de salida
  @Output() clickAdd = new EventEmitter<void>(); // Evento de salida

  @Input() title!: string;
  @Input() img!: string;

  onCardClick() {
    this.cardClick.emit();
  }

  onClickAdd() {
    this.clickAdd.emit();
  }
}
