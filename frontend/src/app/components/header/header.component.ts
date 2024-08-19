import { UserRole } from './../../modules/auth/interfaces/user';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../modules/auth/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user: User = {
    id: 1,
    email: "john.doe@example.com",
    username: "johnnyD",
    password: "securePass123!",
    role: UserRole.DEVELOPER
  };

  constructor(private router: Router){}

  mentalButton(){
    this.router.navigate(['mental']);
  }

  feedingButton(){
    this.router.navigate(['feeding']);
  }

  physicButton(){
    this.router.navigate(['physic']);
  }
}
