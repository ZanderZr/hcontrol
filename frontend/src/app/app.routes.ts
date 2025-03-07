import { Routes } from '@angular/router';
import { OptionsPageComponent } from './modules/options/options-page/options-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

export const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.routes').then((m) => m.MAIN_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'mental',
    loadChildren: () =>
      import('./modules/mental/mental.routes').then((m) => m.MENTAL_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'physic',
    loadChildren: () =>
      import('./modules/physic/physic.routes').then((m) => m.PHYSIC_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'feeding',
    loadChildren: () =>
      import('./modules/feeding/feeding.routes').then((m) => m.FEEDING_ROUTES),
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'options',
    component: OptionsPageComponent,
    data: { title: 'Configuración' },
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'home',
    component: HomePageComponent,
    data: { title: 'Tablón' },
    canActivate: [AuthGuard], // Protegido
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];
