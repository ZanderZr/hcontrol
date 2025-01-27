import { Component } from '@angular/core';
import { PageComponent } from "../../../components/page/page.component";
import { ToolsCardComponent } from "../../../components/tools-card/tools-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mental-breath',
  standalone: true,
  imports: [PageComponent, ToolsCardComponent, CommonModule],
  templateUrl: './mental-breath.component.html',
  styleUrl: './mental-breath.component.scss'
})
export class MentalBreathComponent {
  step:string = "";
  technique: number = 1;

  onAnimationIteration(event: AnimationEvent) {
    const currentTime = (event.elapsedTime % 19); // Duración total de la animación es de 19s

    // Asignamos el valor de 'step' dependiendo del tiempo transcurrido en la animación
    if (currentTime >= 0 && currentTime <= 4) {
      this.step = 'Inspira';
    } else if (currentTime > 4 && currentTime <= 11) {
      this.step = 'Aguanta';
    } else if (currentTime > 11 && currentTime <= 19) {
      this.step = 'Expira';
    }
  }

  onAnimationEnd(event: AnimationEvent) {

  }
}
