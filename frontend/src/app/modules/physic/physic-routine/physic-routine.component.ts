import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { ExerciseService } from '../services/exercise.service';
import { ExerciseCardComponent } from '../../../components/exercise-card/exercise-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RoutineCardComponent } from '../../../components/routine-card/routine-card.component';
import { Routine } from '../interfaces/routine';
import { FabButtonComponent } from '../../../components/fab-button/fab-button.component';
import { Exercise } from '../interfaces/exercise';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    MatButtonToggleModule,
    RoutineCardComponent,
    FabButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './physic-routine.component.html',
  styleUrl: './physic-routine.component.scss',
})
export class PhysicRoutineComponent implements OnInit {
  newRoutine!: Routine;
  newExercises: Exercise[] = [];
  routines: Routine[] = [];
  exercises: any[] = [];
  types: string[] = [
    'cardio',
    'olympic_weightlifting',
    'plyometrics',
    'powerlifting',
    'strength',
    'stretching',
    'strongman',
  ];
  muscles: string[] = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps',
  ];
  difficulty: string[] = ['beginner', 'intermediate', 'expert'];
  selectedMuscle: string = '';
  selectedType: string = '';
  selectedDiff: string = '';

  routineCreation: boolean = false;
  formRoutine:FormGroup;
  constructor(
    private _exerciseService: ExerciseService,
    private fb: FormBuilder
  ) {
    this.formRoutine = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {}

  // Llamada combinada para cargar ejercicios por los tres filtros
  loadExercises(): void {
    // Creamos un objeto con los filtros seleccionados
    const filters = {
      type: this.selectedType,
      muscle: this.selectedMuscle,
      difficulty: this.selectedDiff,
    };

    // Llamamos al servicio pasando todos los filtros
    this._exerciseService.getFilteredExercises(filters).subscribe(
      (data) => {
        this.exercises = data;
        console.log('Ejercicios:', this.exercises);
      },
      (error) => {
        console.error('Error al obtener ejercicios:', error);
      }
    );
  }

  setRoutineCreation(value: boolean) {
    this.routineCreation = value;
  }

  pushToRoutine(exercise: Exercise) {}
}
