import { Component, OnInit } from '@angular/core';
import { Routine } from '../interfaces/routine';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Exercise } from '../interfaces/exercise';
import { ExerciseService } from '../services/exercise.service';
import { PageComponent } from '../../page/page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-physic-routine-details',
  standalone: true,
  imports: [CommonModule, PageComponent, MatExpansionModule, FormsModule],
  templateUrl: './physic-routine-details.component.html',
  styleUrl: './physic-routine-details.component.scss',
})
export class PhysicRoutineDetailsComponent implements OnInit {
  routine!: Routine;
  routineId!: number;
  exercises: Exercise[] = [];
  idUser!: number;

  /**
   * Constructor del componente. Inicializa los servicios necesarios para obtener datos relacionados con las rutinas y ejercicios.
   * @param _apiService - Servicio para interactuar con la API para obtener o guardar datos relacionados con las rutinas.
   * @param route - Servicio ActivatedRoute para obtener parámetros de la URL.
   * @param _exerciseService - Servicio para obtener los ejercicios filtrados por nombre.
   * @param _authService - Servicio de autenticación para obtener datos del usuario actual.
   */
  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _authService: AuthService
  ) {
    this.idUser = this._authService.getUserData().id;
  }

  /**
   * Método de inicialización del componente.
   * Recupera el ID de la rutina desde los parámetros de la URL y obtiene los detalles de la rutina y los ejercicios asociados.
   */
  ngOnInit(): void {
    // Esperamos a que el ID esté disponible antes de hacer la llamada a la API
    this.route.paramMap.subscribe((params) => {
      this.routineId = Number(params.get('id')); // Convierte el ID a número
      console.log('ID de la rutina:', this.routineId);
    });

    // Ahora que tenemos el ID, hacemos la petición para obtener la rutina
    this._apiService.getRoutine(this.routineId).subscribe(
      (response) => {
        this.routine = response;
        console.log('Rutina obtenida:', response);

        // Ahora que tenemos la rutina, obtenemos los ejercicios
        if (this.routine.exercises?.length) {
          this._exerciseService
            .getExercisesByNames(this.routine.exercises)
            .subscribe(
              (exercises) => {
                this.exercises = exercises;
                console.log('Ejercicios obtenidos:', exercises);
              },
              (error) => {
                console.error('Error al obtener ejercicios:', error);
              }
            );
        } else {
          console.warn('La rutina no tiene ejercicios.');
        }
      },
      (error) => console.error('Error al obtener la rutina:', error)
    );
  }

  /**
   * Guarda un ejercicio con los datos proporcionados.
   * Envia el ejercicio a la API para guardarlo en la base de datos.
   * @param exercise - Objeto de tipo `Exercise` que contiene los datos del ejercicio a guardar.
   */
  saveExercise(exercise: Exercise): void {
    const exer: Exercise = {
      name: exercise.name,
      idUser: this.idUser, // Asegurar que tiene un valor
      exec_time: exercise.exec_time,
      max_weight: exercise.max_weight,
      max_rep: exercise.max_rep,
    };

    this._apiService.postExercise(exer).subscribe(
      (response) => {
        console.log('Ejercicio guardado en la BD:', response);
      },
      (error) => {
        console.error('Error al guardar el ejercicio:', error);
      }
    );
  }
}
