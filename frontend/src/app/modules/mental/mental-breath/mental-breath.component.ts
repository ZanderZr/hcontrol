import { Component } from '@angular/core';
import { PageComponent } from "../../page/page.component";
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
  step: string=""
  technique: number = 0;
  private timer: any;


  startAnimationCycle(first: number, second: number, third: number, total:number): void {
    const times = [first, second, third];
    const step = ["Inspira", "Aguanta", "Expira"]
    let currentIndex = 0;

    const updateValue = () => {
      if (currentIndex < times.length) {
        const seconds = times[currentIndex];
        this.step = step[currentIndex]; // Cambia a 'sol', 'luna', 'rana'
        currentIndex++;
        setTimeout(updateValue, seconds * 1000);
      } else {
        this.step = "Inspira"
        currentIndex = 0;
        updateValue();
      }
    };

    updateValue();
  }

  selectTec(number: number) {
    this.technique = number;

    switch (this.technique) {
      case 1:
        this.startAnimationCycle(4,7,6,17);
        break;
      case 2:
        this.startAnimationCycle(4,7,8,19);
        break;

    }
  }

}
