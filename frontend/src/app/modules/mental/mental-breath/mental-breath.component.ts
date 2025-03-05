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
  
  /**
   * Define el estado actual de la fase de respiración (Inspira, Aguanta, Expira).
   * @type {string}
   */
  step: string = "";

  /**
   * Número que representa la técnica de respiración seleccionada.
   * @type {number}
   */
  technique: number = 0;

  /**
   * Almacena el identificador del temporizador para que se pueda cancelar si es necesario.
   * @private
   * @type {any}
   */
  private timer: any;

  /**
   * Tiempo de inicio de la animación en milisegundos.
   * @private
   * @type {number}
   */
  private startTime: number = 0;

  /**
   * Inicia el ciclo de animación basado en los tiempos de inspiración, retención y expiración.
   * El ciclo se repite según el tiempo total especificado.
   * @param {number} first - Duración en segundos de la fase de inspiración.
   * @param {number} second - Duración en segundos de la fase de retención.
   * @param {number} third - Duración en segundos de la fase de expiración.
   * @param {number} total - Duración total del ciclo en segundos.
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

  /**
   * Selecciona la técnica de respiración y configura los tiempos de cada fase.
   * @param {number} number - El número de la técnica seleccionada (1 o 2).
   */
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

  /**
   * Detiene el temporizador cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
