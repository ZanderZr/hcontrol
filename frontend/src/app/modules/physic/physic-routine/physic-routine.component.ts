import { Component, OnInit } from '@angular/core';
import { PageComponent } from "../../../components/page/page.component";
import { ExerciseService } from '../services/exercise.service';
import { ExerciseCardComponent } from "../../../components/exercise-card/exercise-card.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-physic-routine',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    ExerciseCardComponent,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './physic-routine.component.html',
  styleUrl: './physic-routine.component.scss'
})
export class PhysicRoutineComponent implements OnInit {

  exercises: any[] = [];
  muscles: string[] = [
    'abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest',
    'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back',
    'neck', 'quadriceps', 'traps', 'triceps'
  ];
  selectedMuscle: string = '';
  constructor(private _exerciseService: ExerciseService){

  }

  ngOnInit(): void {
  }

  loadExercises(muscle: string): void {
    this._exerciseService.getExercises(muscle).subscribe(
      (data) => {
        this.exercises = data;
        console.log('Ejercicios:', this.exercises);
      },
      (error) => {
        console.error('Error al obtener ejercicios:', error);
      }
    );
  }
}
