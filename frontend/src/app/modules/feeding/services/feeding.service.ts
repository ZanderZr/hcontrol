import { Injectable } from '@angular/core';

const API_KEY = "41b02402a49e48a3aa94ab8f139e432c";
const BASE_URL = "https://api.spoonacular.com/recipes";

@Injectable({
  providedIn: 'root'
})

export class FeedingService {

  constructor() { }

  async getRecipes() {
    const url = `${BASE_URL}/complexSearch?number=20&apiKey=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.results; // Guarda los resultados en el array
      return recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  }

  async getRecipeById(id: number) {
    const url = `${BASE_URL}/${id}/information?apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener la receta");

      const data = await response.json();
      return data; // Devuelve la receta completa
    } catch (error) {
      console.error("Error al buscar la receta:", error);
      return null;
    }
  }

}
