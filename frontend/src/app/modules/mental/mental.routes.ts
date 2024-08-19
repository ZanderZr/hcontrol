import { Routes } from "@angular/router";
import { MentalPageComponent } from "./mental-page/mental-page.component";

export const MENTAL_ROUTES: Routes = [
  { path: '**', component: MentalPageComponent }
];
