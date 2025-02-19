import { Routes } from '@angular/router';
import { OptionsPageComponent } from './modules/options/options-page/options-page.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/main/main.routes').then((m) => m.MAIN_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'mental',
    loadChildren: () => import('./modules/mental/mental.routes').then((m) => m.MENTAL_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'physic',
    loadChildren: () => import('./modules/physic/physic.routes').then((m) => m.PHYSIC_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'feeding',
    loadChildren: () => import('./modules/feeding/feeding.routes').then((m) => m.FEEDING_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'options',
    component: OptionsPageComponent,
    canActivate: [AuthGuard] // Protegido
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
