import { UserRole } from './../../modules/auth/interfaces/user';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../modules/auth/interfaces/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  user: User = {
    id: 1,
    email: "john.doe@example.com",
    username: "johnnyD",
    password: "securePass123!",
    role: UserRole.DEVELOPER
  };
  selectedButton: any;
  isFeedingButtonActive:boolean | undefined;
  isPhysicButtonActive :boolean | undefined;
  isMentalButtonActive :boolean | undefined;
  isHomeButtonActive:boolean | undefined;

  constructor(private router: Router){}

  mentalButton(){
    this.router.navigate(['mental']);
    this.setButtonFalse()
    this.isMentalButtonActive = true;

  }

  feedingButton(){
    this.router.navigate(['feeding']);
    this.setButtonFalse()
    this.isFeedingButtonActive = true;
  }

  physicButton(){
    this.router.navigate(['physic']);
    this.setButtonFalse()
    this.isPhysicButtonActive = true;

  }
  homeButton(){
    this.router.navigate(['home']);
    this.setButtonFalse()
    this.isHomeButtonActive = true;

  }

  setButtonFalse(){
    this.isMentalButtonActive = false;
    this.isFeedingButtonActive = false;
    this.isPhysicButtonActive = false;
    this.isHomeButtonActive = false;

  }
}
