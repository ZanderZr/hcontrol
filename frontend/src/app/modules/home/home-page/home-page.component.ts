import { Board } from './../interfaces/board';
import { Component } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { BoardCardComponent } from "../../../components/board-card/board-card.component";
import { FabButtonComponent } from "../../../components/fab-button/fab-button.component";
import { AuthService } from '../../auth/services/auth.service';
import { User, UserRole } from '../../auth/interfaces/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
export class HomePageComponent {
  user!: User;
  showForm: boolean = false;
  boardForm: FormGroup;
  board1!: Board;
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder
  ) {
    this.user = this._authService.getUserData();
    console.log(this.user);
    this.board1 = {
      idPro: 1,
      rolePro: UserRole.COACH,
      title: "A",
      description: "B",
      price: "3",
    };

    // Inicializamos el formulario reactivo
    this.boardForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    });
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
