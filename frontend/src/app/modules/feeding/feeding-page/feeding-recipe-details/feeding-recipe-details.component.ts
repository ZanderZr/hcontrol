import { Component, OnInit } from '@angular/core';
import { FeedingService } from '../../services/feeding.service';
import { CommonModule } from '@angular/common';
import { PageComponent } from "../../../page/page.component";

@Component({
  selector: 'app-feeding-recipe-details',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './feeding-recipe-details.component.html',
  styleUrl: './feeding-recipe-details.component.scss'
})
export class FeedingRecipeDetailsComponent implements OnInit{
  recipeId: string;
  recipe: any;

  constructor(private _feedingService: FeedingService) {
    const pathParts = window.location.pathname.split('/');
    this.recipeId = pathParts[pathParts.length - 1]; // Obtiene el último segmento de la URL
  }

  ngOnInit(): void {
    this._feedingService.getRecipeById(Number(this.recipeId)).then((recipe) => {
      this.recipe = recipe;
    });
  }



}
