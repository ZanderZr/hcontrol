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
  user!: User;
  showForm: boolean = false;
  boardForm: FormGroup;
  boards: Board[]= [];

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private _apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.user = this._authService.getUserData();

    // Inicializamos el formulario reactivo
    this.boardForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this._apiService.getAllBoard().subscribe(
      (data) => {
        this.boards = data;
      },
      (error) => {
        console.error('Error al cargar boards:', error);
      }
    );
  }

  acceptService(board: Board) {
    const notification: Notification = {
      idEmitter: this.user.id!,
      idReceiver: board.idPro,
      description: "Oferta: " + board.title + " aceptada"
    };

    this._apiService.postNotification(notification).subscribe(
      (response: Notification) => {
        console.log("Notificación creada exitosamente:", response);
        this.toastr.success('Servicio solicitado');
      },
      (error) => {
        console.error("Error al solicitar el servicio:", error);
      }
    );
  }


  saveBoard() {
    if (this.boardForm.invalid) {
      return; // No envía si el formulario es inválido
    }

    const newBoard: Board = {
      idPro: this.user.id!,
      rolePro: this.user.role!,
      title: this.boardForm.value.title,
      description: this.boardForm.value.description,
      price: this.boardForm.value.price,
    };

    console.log('Nuevo board:', newBoard);

    this.showForm = false;
    this.boardForm.reset(); // Resetea el formulario después de enviar
  }
}
