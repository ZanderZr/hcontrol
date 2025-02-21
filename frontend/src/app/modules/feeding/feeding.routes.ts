import { Routes } from "@angular/router";
import { FeedingPageComponent } from "./feeding-page/feeding-page.component";
import { FeedingRecipeDetailsComponent } from "./feeding-page/feeding-recipe-details/feeding-recipe-details.component";

export const FEEDING_ROUTES: Routes = [
  { path: 'recipe-details/:id', component: FeedingRecipeDetailsComponent, data: { title: 'Receta' } },
  { path: '', component: FeedingPageComponent, data: { title: 'Alimentación' } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
