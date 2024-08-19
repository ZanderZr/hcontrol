import { Routes } from "@angular/router";
import { PhysicPageComponent } from "./physic-page/physic-page.component";

export const PHYSIC_ROUTES: Routes = [
  { path: '**', component: PhysicPageComponent }
];
