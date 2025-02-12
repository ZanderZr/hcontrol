import { Component, OnDestroy } from '@angular/core';
import { PageComponent } from "../../page/page.component";
import { ToolsCardComponent } from "../../../components/tools-card/tools-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mental-breath',
  standalone: true,
  imports: [PageComponent, ToolsCardComponent, CommonModule],
  templateUrl: './mental-breath.component.html',
  styleUrls: ['./mental-breath.component.scss']
})
export class MentalBreathComponent implements OnDestroy {
  step: string = "";
  technique: number = 0;
  private timer: any;
  private startTime: number = 0;

  /**
   * Inicia el ciclo de animación basado en tiempos:
   * - first: duración (en segundos) de "Inspira"
   * - second: duración de "Aguanta"
   * - third: duración de "Expira"
   * - total: duración total del ciclo (se usa para recalcular el ciclo)
   */
  startAnimationCycle(first: number, second: number, third: number, total: number): void {
    // Calcula el ciclo total en milisegundos
    const cycleDuration = total * 1000;
    this.startTime = Date.now();

    // Limpia cualquier timer anterior
    if (this.timer) {
      clearInterval(this.timer);
    }

    // Utiliza un intervalo corto para actualizar la variable según el tiempo transcurrido
    this.timer = setInterval(() => {
      // Calcula el tiempo transcurrido en este ciclo (en milisegundos)
      const elapsed = (Date.now() - this.startTime) % cycleDuration;

      // Según el tiempo, asigna el estado correspondiente
      if (elapsed < first * 1000) {
        this.step = "Inspira";
      } else if (elapsed < (first + second) * 1000) {
        this.step = "Aguanta";
      } else {
        this.step = "Expira";
      }
    }, 100); // Actualiza cada 100 ms para mayor precisión
  }

  selectTec(number: number): void {
    this.technique = number;
    switch (this.technique) {
      case 1:
        // Ejemplo: 4 s inspira, 7 s aguanta, 6 s expira, total 17 s
        this.startAnimationCycle(4, 7, 6, 17);
        break;
      case 2:
        // Ejemplo: 4 s inspira, 7 s aguanta, 8 s expira, total 19 s
        this.startAnimationCycle(4, 7, 8, 19);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
