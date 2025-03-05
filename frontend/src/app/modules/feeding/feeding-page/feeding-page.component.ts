import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { RecipeCardComponent } from '../../../components/recipe-card/recipe-card.component';
import { Recipe } from '../interfaces/recipe';
import { title } from 'process';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedingService } from '../services/feeding.service';

const API_KEY = '41b02402a49e48a3aa94ab8f139e432c';
const BASE_URL = 'https://api.spoonacular.com/recipes';

@Component({
  selector: 'app-feeding-page',
  standalone: true,
  imports: [PageComponent, RecipeCardComponent, CommonModule],
  templateUrl: './feeding-page.component.html',
  styleUrl: './feeding-page.component.scss',
})
export class FeedingPageComponent implements OnInit {
  
  /**
   * Lista de recetas que se obtiene de la API o del servicio.
   * @type {any[]}
   */
  recipes: any[] = [];

  /**
   * Constructor del componente que inyecta el servicio de alimentación y el enrutador.
   * @param {Router} router - El servicio para navegar entre rutas.
   * @param {FeedingService} _feedingService - El servicio que maneja la obtención de recetas.
   */
  constructor(
    private router: Router,
    private _feedingService: FeedingService
  ) {}

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Llama al servicio para obtener las recetas.
   */
  async ngOnInit() {
    this.recipes = await this._feedingService.getRecipes(); // Asigna las recetas obtenidas a la variable 'recipes'
  }

  /**
   * Método para obtener recetas desde la API externa usando fetch.
   * @returns {Promise<any[]>} - Retorna un array de recetas.
   */
  async getRecipes() {
    const url = `${BASE_URL}/complexSearch?number=20&apiKey=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.recipes = data.results; // Guarda los resultados en el array 'recipes'
      return this.recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return []; // Retorna un array vacío en caso de error
    }
  }

  /**
   * Navega a la vista de detalles de una receta específica.
   * @param {number} id - El ID de la receta para mostrar sus detalles.
   */
  goToDetails(id: number) {
    this.router.navigate([`feeding/recipe-details/${id}`]); // Navega a la ruta de detalles con el ID de la receta
  }
}
