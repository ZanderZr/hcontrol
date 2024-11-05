import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from "../../../components/footer/footer.component";
import { PageComponent } from "../../../components/page/page.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    PageComponent,
    RouterOutlet
],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

  isLogged: boolean = false;
  constructor(private router:Router){}

  loginRoute(){
    this.router.navigate(['/auth/login']);
  }

  registerRoute(){
    this.router.navigate(['/auth/register']);
  }
}
