import { Routes } from "@angular/router";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent,},
  { path: 'register', component: RegisterComponent },
  { path: '', component: AuthPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
