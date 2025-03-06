import { Notification } from './../../auth/interfaces/notification';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageComponent } from '../../page/page.component';
import { MatListModule } from '@angular/material/list';
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
    NotificationCardComponent,
  ],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.scss',
})
export class OptionsPageComponent implements OnInit {
  /**
   * Lista de notificaciones que el usuario tiene.
   * @type {Notification[]}
   */
  notifications: Notification[] = [];

  /**
   * Información del usuario actual.
   * @type {User}
   */
  user!: User;

  /**
   * Constructor que inicializa el componente con los servicios necesarios.
   * @param {AuthService} _authService - Servicio de autenticación para manejar la sesión del usuario.
   * @param {Router} router - Servicio de enrutamiento para manejar la navegación entre rutas.
   * @param {ApiService} _apiService - Servicio para manejar las solicitudes HTTP a la API.
   */
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this._authService.getUserData();
    this.getAllNotifications();
  }

  ngOnInit(): void {

     this._authService.getNotifications().subscribe(
       (data: Notification[]) => {
         this.notifications = data;
       },
       (error) => {
         console.error('Error al cargar notificaciones desde el socket:', error);
       }
     );
  }

  /**
   * Elimina una notificación específica según el ID proporcionado.
   * @param {number} id - ID de la notificación a eliminar.
   * @returns {void} No devuelve nada, pero actualiza la lista de notificaciones.
   */
  deleteNotification(id: number): void {
    this._authService.deleteNotification(id);
    this._apiService.deleteNotification(id).subscribe(
      () => {
        console.log(`Notificación eliminada correctamente.`);
        this.getAllNotifications(); // Actualiza la lista de notificaciones tras la eliminación
      },
      (error) => {
        console.error('Error al eliminar la notificación:', error);
      }
    );
  }

  /**
   * Obtiene todas las notificaciones del usuario actual.
   * @returns {void} No devuelve nada, pero actualiza la lista de notificaciones.
   */
  getAllNotifications(): void {
    this._apiService.getAllNotifications(this.user.id!).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error al cargar notificaciones:', error);
      }
    );
  }


  /**
   * Cierra la sesión del usuario y navega a la página de inicio.
   * @returns {void} No devuelve nada, realiza la operación de logout y redirige al usuario.
   */
  logout(): void {
    this._authService.logout();
    this._authService.disconnect();
    this.router.navigate(['/home']);
  }

  /**
   * Navega a la página de creación de rutina personal para un usuario específico.
   * @param {number} idUser - ID del usuario para el cual se quiere crear la rutina personal.
   * @returns {void} No devuelve nada, simplemente realiza la navegación.
   */
  createService(idUser: number): void {
    this.router.navigate(['/physic/personal-routine', idUser]);
  }
}
