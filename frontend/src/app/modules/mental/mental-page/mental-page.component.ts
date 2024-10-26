import { Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { PageComponent } from "../../../components/page/page.component";
import { ToolsCardComponent } from "../../../components/tools-card/tools-card.component";

@Component({
  selector: 'app-mental-page',
  standalone: true,
  imports: [PageComponent, ToolsCardComponent,RouterOutlet],
  templateUrl: './mental-page.component.html',
  styleUrl: './mental-page.component.scss'
})
export class MentalPageComponent {

  constructor(
    private router: Router
  ){}

  diaryClick(){
    this.router.navigate(['/mental/diary']);

  }

  breathClick(){

  }
}
