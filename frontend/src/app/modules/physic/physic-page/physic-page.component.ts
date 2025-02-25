import { Component } from '@angular/core';
import { PageComponent } from "../../page/page.component";
import { ToolsCardComponent } from "../../../components/tools-card/tools-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-physic-page',
  standalone: true,
  imports: [PageComponent, ToolsCardComponent],
  templateUrl: './physic-page.component.html',
  styleUrl: './physic-page.component.scss'
})
export class PhysicPageComponent {

 constructor(
    private router: Router
  ){}

  recordsClick(){
    this.router.navigate(['/physic/records']);

  }

  routineClick(){
    this.router.navigate(['/physic/routine']);

  }
}
