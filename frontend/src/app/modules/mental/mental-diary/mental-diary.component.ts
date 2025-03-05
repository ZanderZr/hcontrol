import { Component } from '@angular/core';
import { PageComponent } from "../../page/page.component";
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../../auth/services/auth.service';
import { ApiService } from '../../../services/api.service';
import { DiaryData } from '../interfaces/diary-data';
import { FormsModule } from '@angular/forms';
import { FabButtonComponent } from "../../../components/fab-button/fab-button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mental-diary',
  standalone: true,
  imports: [
    PageComponent,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    FabButtonComponent,
    CommonModule
  ],
  templateUrl: './mental-diary.component.html',
  styleUrl: './mental-diary.component.scss'
})
export class MentalDiaryComponent {
  /**
   * Fecha seleccionada en formato 'YYYY-MM-DD'.
   * @type {string}
   */
  day: string = "";

  /**
   * ID del usuario actual.
   * @type {number}
   */
  idUser!: number;

  /**
   * Arreglo de entradas de diario del usuario.
   * @type {DiaryData[]}
   */
  diaries: DiaryData[] = [];

  /**
   * Conjunto de fechas permitidas donde el usuario tiene un diario guardado.
   * @type {Set<string>}
   */
  allowedDates: Set<string> = new Set();

  /**
   * Fecha seleccionada por el usuario para mostrar el diario.
   * @type {string}
   */
  selectedDate: string = "";  // Fecha seleccionada en formato 'YYYY-MM-DD'

  /**
   * Texto del diario seleccionado que se muestra en el área de texto.
   * @type {string}
   */
  selectedDiaryText: string = "";  // Contenido del diario en el textarea

  /**
   * Fecha de hoy en formato 'YYYY-MM-DD'.
   * @type {string}
   */
  today: string = new Date().toLocaleDateString("en-CA");  // Formato 'YYYY-MM-DD'

  /**
   * Constructor que inicializa el componente con los servicios necesarios y obtiene los datos del usuario.
   * @param {_authService} _authService - Servicio de autenticación para obtener los datos del usuario.
   * @param {_apiService} _apiService - Servicio de API para interactuar con los datos del diario.
   */
  constructor(
    private _authService: AuthService,
    private _apiService: ApiService
  ) {
    this.idUser = this._authService.getUserData().id;
    this.day = this.getToday();
    this.getAllDiaryDays();
    this.selectedDate = this.today; // Inicializa con la fecha de hoy
  }

  /**
   * Obtiene todas las entradas de diario del usuario desde la API y configura las fechas permitidas.
   * Las fechas permitidas son aquellas en las que el usuario tiene un diario guardado.
   */
  getAllDiaryDays() {
    this._apiService.getAllDiary(this.idUser).subscribe({
      next: (data) => {
        this.diaries = data;

        // Mapea los timestamps de los diarios a fechas 'YYYY-MM-DD'
        this.allowedDates = new Set(
          data.map(diary => new Date(diary.timestamp!).toLocaleDateString("en-CA"))
        );

        // Asegura que la fecha de hoy siempre esté permitida
        this.allowedDates.add(this.today);

        console.log("🟢 Fechas permitidas:", this.allowedDates);
      }
    });
  }

  /**
   * Evento que se ejecuta cuando el usuario selecciona una fecha en el selector de fecha.
   * Muestra el contenido del diario para la fecha seleccionada si existe.
   * @param {any} event - El evento generado por el datepicker.
   */
  onDateSelected(event: any) {
    this.selectedDate = event.value.toLocaleDateString("en-CA"); // 'YYYY-MM-DD'

    // Buscar si hay un diario guardado para la fecha seleccionada
    const diary = this.diaries.find(d =>
      new Date(d.timestamp!).toLocaleDateString("en-CA") === this.selectedDate
    );

    // Si existe, se muestra el contenido; si no, se vacía
    this.selectedDiaryText = diary ? diary.data : "";
  }

  /**
   * Obtiene el nombre del día de la semana en español (por ejemplo, "lunes").
   * @returns {string} El día de la semana.
   */
  getToday(): string {
    return new Date().toLocaleDateString('es-ES', { weekday: 'long' });
  }

  /**
   * Obtiene la fecha actual en formato 'día de mes, año' (por ejemplo, "5 de marzo, 2025").
   * @returns {string} La fecha actual en formato largo.
   */
  getDate(): string {
    return new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /**
   * Filtra las fechas en el datepicker para solo permitir las fechas que el usuario tiene guardadas.
   * @param {Date | null} date - La fecha que se está evaluando en el datepicker.
   * @returns {boolean} Devuelve true si la fecha es válida (permitida), de lo contrario false.
   */
  dateFilter = (date: Date | null): boolean => {
    return date ? this.allowedDates.has(date.toLocaleDateString("en-CA")) : false;
  };

  /**
   * Guarda el contenido del diario para la fecha seleccionada.
   * Si no hay texto, muestra una advertencia en la consola.
   */
  saveDiary() {
    if (!this.selectedDiaryText.trim()) {
      console.warn("⚠️ No hay texto para guardar.");
      return;
    }

    const newDiaryEntry: DiaryData = {
      idUser: this.idUser,
      data: this.selectedDiaryText,
      timestamp: this.selectedDate
    };

    this._apiService.postDiary(newDiaryEntry).subscribe({
      next: (response) => {
        console.log("✅ Diario guardado con éxito:", response);
        this.diaries.push(response);
        this.allowedDates.add(this.selectedDate); // Asegura que la fecha esté permitida
      },
      error: (error) => {
        console.error("❌ Error al guardar el diario:", error);
      }
    });
  }

}
