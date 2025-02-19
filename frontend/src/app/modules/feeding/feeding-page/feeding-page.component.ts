import { Component } from '@angular/core';
import { PageComponent } from "../../page/page.component";
import { RecipeCardComponent } from "../../../components/recipe-card/recipe-card.component";
import { Recipe } from '../interfaces/recipe';
import { title } from 'process';

@Component({
  selector: 'app-feeding-page',
  standalone: true,
  imports: [PageComponent, RecipeCardComponent],
  templateUrl: './feeding-page.component.html',
  styleUrl: './feeding-page.component.scss'
})
export class FeedingPageComponent {
  

  recipe: Recipe = {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://img.spoonacular.com/recipes/661925-312x231.jpg",
    instructions: "1. Cocina la pasta en agua con sal hasta que esté al dente. 2. En un bol, mezcla los huevos con queso parmesano. 3. Sofríe el bacon hasta que esté crujiente. 4. Mezcla la pasta caliente con el bacon y la mezcla de huevo y queso. 5. Sirve con más queso y pimienta negra.",
    ingredients: [
      "200g de spaghetti",
      "100g de bacon",
      "2 huevos",
      "50g de queso parmesano rallado",
      "Pimienta negra",
      "Sal"
    ],
    imageType: "jpg"
  };

}
