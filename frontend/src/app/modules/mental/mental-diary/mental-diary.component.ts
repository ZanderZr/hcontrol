import { Component } from '@angular/core';
import { PageComponent } from "../../../components/page/page.component";

@Component({
  selector: 'app-mental-diary',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './mental-diary.component.html',
  styleUrl: './mental-diary.component.scss'
})
export class MentalDiaryComponent {
  day: string = "";

  constructor() {
    this.day = this.getToday();
  }

  getToday(): string {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' }); // Cambia 'es-ES' por el idioma deseado
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }

  getDate(): string {
    const today = new Date();
    return today.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

}
