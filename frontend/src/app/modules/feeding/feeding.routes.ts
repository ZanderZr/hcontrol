import { Routes } from "@angular/router";
import { FeedingPageComponent } from "./feeding-page/feeding-page.component";

export const FEEDING_ROUTES: Routes = [
  { path: '**', component: FeedingPageComponent }
];
