import { Routes } from "@angular/router";
import { IntroPageComponent } from "./intro-page/intro-page.component";
import { MainPageComponent } from "./main-page/main-page.component";

export const MAIN_ROUTES: Routes = [
  { path: '', component: IntroPageComponent },
  { path: 'main', component: MainPageComponent },
];
