import { Routes } from "@angular/router";
import { PhysicPageComponent } from "./physic-page/physic-page.component";
import { PhysicRecordsComponent } from "./physic-records/physic-records.component";
import { PhysicRoutineComponent } from "./physic-routine/physic-routine.component";
import { PhysicRoutineDetailsComponent } from "./physic-routine-details/physic-routine-details.component";

export const PHYSIC_ROUTES: Routes = [
  { path: 'records', component: PhysicRecordsComponent, data: { title: 'Records' }},
  { path: 'routine', component: PhysicRoutineComponent, data: { title: 'Rutinas' }},
  { path: 'details/:id', component: PhysicRoutineDetailsComponent, data: { title: 'Rutina' }},
  { path: '', component: PhysicPageComponent, data: { title: 'Salud física' }},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
