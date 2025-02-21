import { Routes } from "@angular/router";
import { MentalPageComponent } from "./mental-page/mental-page.component";
import { MentalDiaryComponent } from "./mental-diary/mental-diary.component";
import { MentalBreathComponent } from "./mental-breath/mental-breath.component";

export const MENTAL_ROUTES: Routes = [
  { path: 'diary', component: MentalDiaryComponent, data: { title: 'Diario' }  },
  { path: 'breath', component: MentalBreathComponent, data: { title: 'Respiración' }  },
  { path: '', component: MentalPageComponent, data: { title: 'Salud mental' } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
