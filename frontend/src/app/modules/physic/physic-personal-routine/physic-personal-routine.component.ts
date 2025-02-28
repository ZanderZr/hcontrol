import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { ExerciseService } from '../services/exercise.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../auth/services/auth.service';
import { Exercise } from '../interfaces/exercise';
import { Routine } from '../interfaces/routine';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExerciseCardComponent } from '../../../components/exercise-card/exercise-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FabButtonComponent } from "../../../components/fab-button/fab-button.component";
import { Notification } from './../../auth/interfaces/notification';
import { User } from '../../auth/interfaces/user';

@Component({
  selector: 'app-physic-personal-routine',
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
    ReactiveFormsModule,
    FabButtonComponent
],
  templateUrl: './physic-personal-routine.component.html',
  styleUrl: './physic-personal-routine.component.scss',
})
export class PhysicPersonalRoutineComponent implements OnInit {
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
  idUser!: number;
  routineCreation: boolean = false;
  formRoutine: FormGroup;

  user!:User;
  routineExercises: string[] = [];

  constructor(
    private _exerciseService: ExerciseService,
    private fb: FormBuilder,
    private _apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.formRoutine = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
    this.user = this._authService.getUserData();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idUser = Number(params.get('id')); // Convierte el ID a número
      console.log('ID del solicitante:', this.idUser);
    });  }


  saveRoutine() {
    const newRoutine: Routine = {
      idUser: this.idUser,
      name: this.formRoutine.get('name')?.value,
      description: this.formRoutine.get('description')?.value,
      exercises: this.routineExercises,
    };

    this._apiService.postRoutine(newRoutine).subscribe(
      (response) => {
        console.log('Rutina guardada:', response);
        this.router.navigate(['/options']);

        // Agregar la nueva rutina a la lista local para actualizar la vista
        this.routines = [...this.routines, response];
      },
      (error) => console.error('Error al guardar la rutina:', error)
    );

    const notification: Notification = {
      idEmitter: this.user.id!,
      idReceiver: this.idUser,
      description: "Servicio: " + newRoutine.name + " enviado por " + this.user.username
    }
    
    this._apiService.postNotification(notification)
  }

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

  pushToRoutine(name: string): void {
    this.routineExercises.push(name);
    console.log(this.routineExercises);
  }
}
