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
  recipes: any[] = [];

  constructor(
    private router: Router,
    private _feedingService: FeedingService
  ) {}

  async ngOnInit() {
    this.recipes = await this._feedingService.getRecipes();
  }

  async getRecipes() {
    const url = `${BASE_URL}/complexSearch?number=20&apiKey=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.recipes = data.results; // Guarda los resultados en el array
      return this.recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  }

  goToDetails(id: number) {
    this.router.navigate([`feeding/recipe-details/${id}`]);
  }
}
