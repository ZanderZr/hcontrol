import { Notification } from './../../auth/interfaces/notification';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageComponent } from '../../page/page.component';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { NotificationCardComponent } from '../../../components/notification-card/notification-card.component';
import { ApiService } from '../../../services/api.service';
import { User } from '../../auth/interfaces/user';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PageComponent,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NotificationCardComponent
],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.scss'
})


export class OptionsPageComponent {

  notifications: Notification[]=[];
  user!:User;

  constructor(
    private _authService:AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    this.user = this._authService.getUserData();
    this.getAllNotifications();
  }

  deleteNotification(id:number){
    this._apiService.deleteNotification(id).subscribe(
      () => {
        console.log(`Notificacion eliminada correctamente.`);
        this.getAllNotifications();
      },
      (error) => {
        console.error('Error al eliminar la rutina:', error);
      }
    );
  }

  getAllNotifications() {
    this._apiService.getAllNotifications(this.user.id!).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error al cargar rutinas:', error);
      }
    );
  }
  logout(){
    this._authService.logout();
    this.router.navigate(['/home']);
  }

  createService(idUser: number){
    this.router.navigate(['/physic/personal-routine', idUser]);
  }
}
