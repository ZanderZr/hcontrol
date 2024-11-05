import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageComponent } from './components/page/page.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthPageComponent } from './modules/auth/auth-page/auth-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-page></app-page>`,
  imports: [RouterOutlet, FontAwesomeModule, PageComponent, FooterComponent, HeaderComponent, AuthPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HControl';
}
