import { Component } from '@angular/core';
import { PageComponent } from "../../../components/page/page.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
