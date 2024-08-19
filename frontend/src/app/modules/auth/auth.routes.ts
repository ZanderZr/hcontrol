import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthPageComponent } from "./auth-page/auth-page.component";



export const AUTH_ROUTES: Routes = [
  { path: '**', component: AuthPageComponent }
];
