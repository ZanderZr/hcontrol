import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FeedingService {

  apiUrl: string = 'https://spoonacular.com/food-api'
  apiKey: string = '8416942f95f043e0af8a3f2ee6addf99';

  constructor() { }
}
