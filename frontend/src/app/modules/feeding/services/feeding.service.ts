import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FeedingService {

  apiUrl: string = 'https://api.spoonacular.com/recipes'
  apiKey: string = '33c30ceb3f6043baa8d79f3ce3e96de8';
  //https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=33c30ceb3f6043baa8d79f3ce3e96de8
  //https://api.spoonacular.com/recipes/661925/information?includeNutrition=false&apiKey=33c30ceb3f6043baa8d79f3ce3e96de8
  constructor() { }
}
