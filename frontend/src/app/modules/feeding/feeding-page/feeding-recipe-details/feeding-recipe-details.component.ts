import { Component, OnInit } from '@angular/core';
import { FeedingService } from '../../services/feeding.service';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../page/page.component';

@Component({
  selector: 'app-feeding-recipe-details',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './feeding-recipe-details.component.html',
  styleUrl: './feeding-recipe-details.component.scss',
})
export class FeedingRecipeDetailsComponent implements OnInit {
  /**
   * ID de la receta obtenido de la URL.
   * @type {string}
   */
  recipeId!: string;

  /**
   * Objeto que almacena los detalles de la receta obtenidos del servicio.
   * @type {any}
   */
  recipe: any;

  /**
   * Constructor del componente.
   * @param {FeedingService} _feedingService - Servicio que maneja las recetas.
   */
  constructor(private _feedingService: FeedingService) {
    // Obtiene el último segmento de la URL como el ID de la receta
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      this.recipeId = pathParts[pathParts.length - 1]; // Obtiene el último segmento de la URL
    }
  }

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Obtiene los detalles de la receta desde el servicio utilizando el ID.
   */
  ngOnInit(): void {
    // Llama al servicio para obtener los detalles de la receta por ID
    this._feedingService.getRecipeById(Number(this.recipeId)).then((recipe) => {
      this.recipe = recipe; // Asigna los detalles de la receta al objeto 'recipe'
    });
  }
}
