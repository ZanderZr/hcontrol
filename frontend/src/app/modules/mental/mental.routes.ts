import { Routes } from "@angular/router";
import { MentalPageComponent } from "./mental-page/mental-page.component";
import { MentalDiaryComponent } from "./mental-diary/mental-diary.component";

export const MENTAL_ROUTES: Routes = [
  { path: 'diary', component: MentalDiaryComponent },
  // { path: 'breath', component: MentalBreathComponent },
  { path: '', component: MentalPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
