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
  ,
  {
    path: 'mental',
    loadChildren:() => import('./modules/mental/mental.routes').then( m=> m.MENTAL_ROUTES )
  }
  ,
  {
    path: 'physic',
    loadChildren:() => import('./modules/physic/physic.routes').then( m=> m.PHYSIC_ROUTES )
  }
  ,
  {
    path: 'feeding',
    loadChildren:() => import('./modules/feeding/feeding.routes').then( m=> m.FEEDING_ROUTES )
  }
];
