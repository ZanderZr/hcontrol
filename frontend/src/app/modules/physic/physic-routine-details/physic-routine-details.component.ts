import { Component, OnInit } from '@angular/core';
import { Routine } from '../interfaces/routine';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Exercise } from '../interfaces/exercise';
import { ExerciseService } from '../services/exercise.service';
import { PageComponent } from "../../page/page.component";

@Component({
  selector: 'app-physic-routine-details',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './physic-routine-details.component.html',
  styleUrl: './physic-routine-details.component.scss'
})
export class PhysicRoutineDetailsComponent implements OnInit {
  routine!: Routine;
  routineId!: number;
  exercises: Exercise[] = [];

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private _exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    // Esperamos a que el ID esté disponible antes de hacer la llamada a la API
    this.route.paramMap.subscribe(params => {
      this.routineId = Number(params.get('id')); // Convierte el ID a número
      console.log('ID de la rutina:', this.routineId);


    });

    // Ahora que tenemos el ID, hacemos la petición para obtener la rutina
    this._apiService.getRoutine(this.routineId).subscribe(
      (response) => {
        this.routine = response;
        console.log("Rutina obtenida:", response);

        // Ahora que tenemos la rutina, obtenemos los ejercicios
        if (this.routine.exercises?.length) {
          this._exerciseService.getExercisesByNames(this.routine.exercises).subscribe(
            exercises => {
              this.exercises = exercises;
              console.log('Ejercicios obtenidos:', exercises);
            },
            error => {
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
}
