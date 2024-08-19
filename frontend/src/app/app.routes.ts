import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./modules/main/main.routes').then( m=> m.MAIN_ROUTES )
  },
  {
    path: 'auth',
    loadChildren:() => import('./modules/auth/auth.routes').then( m=> m.AUTH_ROUTES )
  }
];
