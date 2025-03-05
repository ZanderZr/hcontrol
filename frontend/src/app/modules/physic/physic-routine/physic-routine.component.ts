import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../auth/services/auth.service';

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
    ReactiveFormsModule,
  ],
  templateUrl: './physic-routine.component.html',
  styleUrl: './physic-routine.component.scss',
})
export class PhysicRoutineComponent implements OnInit {
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

  routineExercises: string[] = [];

  /**
   * Constructor para inicializar el componente de rutinas.
   * @param _exerciseService - Servicio para obtener los ejercicios filtrados según los parámetros.
   * @param fb - FormBuilder utilizado para crear formularios reactivos.
   * @param _apiService - Servicio para interactuar con la API y realizar operaciones sobre las rutinas.
   * @param cdr - ChangeDetectorRef para manejar las actualizaciones de la vista.
   * @param _authService - Servicio de autenticación para obtener el usuario actual.
   * @param router - Router de Angular para gestionar las rutas de navegación.
   */
  constructor(
    private _exerciseService: ExerciseService,
    private fb: FormBuilder,
    private _apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private router: Router
  ) {
    this.formRoutine = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
    this.idUser = this._authService.getUserData().id;
  }

  /**
   * Método de inicialización del componente.
   * Se carga la lista de rutinas cuando se inicializa el componente.
   */
  ngOnInit(): void {
    this.getAllRoutines();
  }

  /**
   * Obtiene todas las rutinas asociadas al usuario desde la API.
   * Actualiza el arreglo de rutinas en el componente.
   */
  getAllRoutines() {
    this._apiService.getAllRoutine(this.idUser).subscribe(
      (data) => {
        this.routines = [];
        this.routines = data;
      },
      (error) => {
        console.error('Error al cargar rutinas:', error);
      }
    );
  }

  /**
   * Navega a la vista de detalles de una rutina específica.
   * @param id - ID de la rutina seleccionada.
   */
  goToRoutineDetails(id: number) {
    this.router.navigate(['/physic/details', id]);
  }

  /**
   * Elimina una rutina utilizando el ID proporcionado.
   * Después de eliminar la rutina, vuelve a cargar todas las rutinas.
   * @param id - ID de la rutina a eliminar.
   */
  deleteRoutine(id: number) {
    this._apiService.deleteRoutine(id).subscribe(
      () => {
        console.log(`Rutina con ID ${id} eliminada correctamente.`);
        this.getAllRoutines();
      },
      (error) => {
        console.error('Error al eliminar la rutina:', error);
      }
    );
  }

  /**
   * Guarda una nueva rutina en la API con los datos del formulario.
   * Después de guardarla, agrega la nueva rutina a la lista local y actualiza la vista.
   */
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

        // Agregar la nueva rutina a la lista local para actualizar la vista
        this.routines = [...this.routines, response];

        this.setRoutineCreation(false);
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al guardar la rutina:', error)
    );
  }

  /**
   * Carga los ejercicios según los filtros seleccionados.
   * Llama al servicio de ejercicios para obtener los ejercicios filtrados.
   */
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

  /**
   * Establece el estado de la creación de rutina (si está en proceso de creación o no).
   * @param value - Valor booleano para definir si se está creando una rutina.
   */
  setRoutineCreation(value: boolean) {
    this.routineCreation = value;
  }

  /**
   * Agrega un ejercicio a la lista de ejercicios de la rutina actual.
   * @param name - Nombre del ejercicio a agregar.
   */
  pushToRoutine(name: string): void {
    this.routineExercises.push(name);
    console.log(this.routineExercises);
  }
}
