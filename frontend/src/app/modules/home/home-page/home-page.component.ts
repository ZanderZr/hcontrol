import { Board } from './../interfaces/board';
import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { BoardCardComponent } from "../../../components/board-card/board-card.component";
import { FabButtonComponent } from "../../../components/fab-button/fab-button.component";
import { AuthService } from '../../auth/services/auth.service';
import { User, UserRole } from '../../auth/interfaces/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Notification } from '../../auth/interfaces/notification';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PageComponent,
    BoardCardComponent,
    FabButtonComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  /**
   * Usuario actual que está logueado.
   * @type {User}
   */
  user!: User;

  /**
   * Bandera para controlar la visibilidad del formulario.
   * @type {boolean}
   */
  showForm: boolean = false;

  /**
   * Formulario reactivo para crear un nuevo board.
   * @type {FormGroup}
   */
  boardForm: FormGroup;

  /**
   * Lista de boards obtenidos desde el servidor.
   * @type {Board[]}
   */
  boards: Board[] = [];

  /**
   * Constructor del componente que inyecta los servicios necesarios.
   * @param {AuthService} _authService - Servicio de autenticación que maneja la sesión del usuario.
   * @param {FormBuilder} fb - Servicio que crea formularios reactivos.
   * @param {ApiService} _apiService - Servicio que gestiona las llamadas a la API.
   * @param {ToastrService} toastr - Servicio para mostrar mensajes de notificación.
   */
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private _apiService: ApiService,
    private toastr: ToastrService
  ) {
    // Obtiene los datos del usuario logueado
    this.user = this._authService.getUserData();

    // Inicializa el formulario reactivo con sus validaciones
    this.boardForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Obtiene todos los boards desde la API.
   */
  ngOnInit(): void {
    this._apiService.getAllBoard().subscribe(
      (data) => {
        this.boards = data; // Asigna los boards obtenidos a la variable 'boards'
      },
      (error) => {
        console.error('Error al cargar boards:', error); // Maneja errores al cargar boards
      }
    );
  }

  /**
   * Método para aceptar un servicio y crear una notificación para el receptor.
   * @param {Board} board - El board cuyo servicio está siendo aceptado.
   */
  acceptService(board: Board) {
    // Crea un objeto de notificación con los detalles del servicio aceptado
    const notification: Notification = {
      idEmitter: this.user.id!,
      idReceiver: board.idPro,
      description: "Oferta: " + board.title + " aceptada por " + this.user.username
    };

    // Llama al servicio para enviar la notificación
    this._apiService.postNotification(notification).subscribe(
      (response: any) => {
        // Maneja diferentes respuestas del servidor
        if (response.message && response.message === 'El emisor y receptor no pueden ser el mismo.') {
          console.log("Mismo id:", response.notification);
          this.toastr.info('No puedes solicitar tus propios servicios');
        }
        else if (response.message && response.message === 'La notificación ya existe') {
          console.log("Notificación ya existente:", response.notification);
          this.toastr.info('El servicio ya fue solicitado previamente');
        } else {
          console.log("Notificación creada exitosamente:", response);
          this.toastr.success('Servicio solicitado');
        }
      },
      (error) => {
        console.error("Error al solicitar el servicio:", error); // Maneja errores al crear la notificación
        this.toastr.error('Error al solicitar el servicio');
      }
    );
  }

  /**
   * Método para guardar un nuevo board. Si el formulario es inválido, no realiza ninguna acción.
   */
  saveBoard() {
    if (this.boardForm.invalid) {
      return; // No envía si el formulario es inválido
    }

    // Crea un nuevo board con los datos del formulario
    const newBoard: Board = {
      idPro: this.user.id!,
      rolePro: this.user.role!,
      title: this.boardForm.value.title,
      description: this.boardForm.value.description,
      price: this.boardForm.value.price,
    };

    this.boards.push(newBoard);
    this._apiService.postBoard(newBoard).subscribe(
      (response: any) => {
        this.toastr.success('Anuncio enviado con exito');
      },
      (error) => {
        console.error("Error al solicitar el servicio:", error); // Maneja errores al crear la notificación
        this.toastr.error('Error al enviar el anuncio servicio');
      }
    );
    console.log('Nuevo board:', newBoard); // Muestra los datos del nuevo board en la consola

    // Oculta el formulario y resetea sus campos después de guardar
    this.showForm = false;
    this.boardForm.reset();
  }
}
