import { Component } from '@angular/core';
import { PageComponent } from "../../page/page.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-physic-records',
  standalone: true,
  imports: [PageComponent,CommonModule],
  templateUrl: './physic-records.component.html',
  styleUrl: './physic-records.component.scss'
})
export class PhysicRecordsComponent {

  idUser!: number;
  exercises: Exercise[]=[];

  constructor(private _authService: AuthService,
    private _apiService: ApiService
  ){
    this.idUser = this._authService.getUserData().id;

    this._apiService.getAllExercise(this.idUser).subscribe({
      next: (data) => {
        this.exercises = data;
      },
      error: (error) => {
        console.error('Error al cargar ejercicios:', error);
      },
      complete: () => {
        console.log('Carga de ejercicios completada');
      }
    });
    
  }

}
