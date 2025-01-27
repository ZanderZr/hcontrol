import { Routes } from "@angular/router";
import { PhysicPageComponent } from "./physic-page/physic-page.component";
import { PhysicRecordsComponent } from "./physic-records/physic-records.component";
import { PhysicRoutineComponent } from "./physic-routine/physic-routine.component";

export const PHYSIC_ROUTES: Routes = [
  { path: 'records', component: PhysicRecordsComponent },
  { path: 'routine', component: PhysicRoutineComponent },
  { path: '', component: PhysicPageComponent, data: { title: 'Salud física' }},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
