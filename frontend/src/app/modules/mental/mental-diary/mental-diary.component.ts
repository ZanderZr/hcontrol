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

@Component({
  selector: 'app-mental-diary',
  standalone: true,
  imports: [PageComponent,MatNativeDateModule,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './mental-diary.component.html',
  styleUrl: './mental-diary.component.scss'
})
export class MentalDiaryComponent {

  day: string = "";
  idUser!: number;
  diaries: DiaryData[] = [];
  allowedDates: Set<string> = new Set(); // Almacena los días permitidos

  constructor(
    private _authService: AuthService,
    private _apiService: ApiService
  ) {
    this.idUser = this._authService.getUserData().id;
    this.day = this.getToday();
    this.getAllDiaryDays();
  }

  getAllDiaryDays() {
    this._apiService.getAllDiary(this.idUser).subscribe({
      next: (data) => {
        this.diaries = data;
        console.log(data)
        // Convertir los timestamps a fechas y guardarlas en el Set
        this.allowedDates = new Set(
          data.map(diary => new Date(diary.timestap).toDateString())
        );
      },
      error: (error) => {
        console.error('Error al cargar diarios:', error);
      },
      complete: () => {
        console.log('Carga de diarios completada');
      }
    });
  }

  getToday(): string {
    const today = new Date();
    return today.toLocaleDateString('es-ES', { weekday: 'long' });
  }

  getDate(): string {
    const today = new Date();
    return today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Función para filtrar fechas en el Datepicker
  dateFilter = (date: Date | null): boolean => {
    return date ? this.allowedDates.has(date.toDateString()) : false;
  };

}
