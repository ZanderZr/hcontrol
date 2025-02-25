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
  day: string = "";
  idUser!: number;
  diaries: DiaryData[] = [];
  allowedDates: Set<string> = new Set();
  selectedDate: string = "";  // Fecha seleccionada en formato 'YYYY-MM-DD'
  selectedDiaryText: string = "";  // Contenido del diario en el textarea
  today: string = new Date().toLocaleDateString("en-CA");  // Formato 'YYYY-MM-DD'

  constructor(
    private _authService: AuthService,
    private _apiService: ApiService
  ) {
    this.idUser = this._authService.getUserData().id;
    this.day = this.getToday();
    this.getAllDiaryDays();
    this.selectedDate = this.today; // Inicializa con la fecha de hoy
  }

  getAllDiaryDays() {
    this._apiService.getAllDiary(this.idUser).subscribe({
      next: (data) => {
        this.diaries = data;

        this.allowedDates = new Set(
          data.map(diary => new Date(diary.timestamp!).toLocaleDateString("en-CA"))
        );

        // Asegurar que la fecha de hoy siempre esté permitida
        this.allowedDates.add(this.today);

        console.log("🟢 Fechas permitidas:", this.allowedDates);
      }
    });
  }

  // Evento al seleccionar una fecha en el datepicker
  onDateSelected(event: any) {
    this.selectedDate = event.value.toLocaleDateString("en-CA"); // 'YYYY-MM-DD'

    // Buscar si hay un diario guardado para la fecha seleccionada
    const diary = this.diaries.find(d =>
      new Date(d.timestamp!).toLocaleDateString("en-CA") === this.selectedDate
    );

    // Si existe, se muestra el contenido; si no, se vacía
    this.selectedDiaryText = diary ? diary.data : "";
  }

  getToday(): string {
    return new Date().toLocaleDateString('es-ES', { weekday: 'long' });
  }

  getDate(): string {
    return new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Función para filtrar fechas en el Datepicker
  dateFilter = (date: Date | null): boolean => {
    return date ? this.allowedDates.has(date.toLocaleDateString("en-CA")) : false;
  };

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
        this.allowedDates.add(this.selectedDate); // Asegurar que la fecha esté permitida
      },
      error: (error) => {
        console.error("❌ Error al guardar el diario:", error);
      }
    });
  }

}
