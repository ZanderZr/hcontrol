import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthService } from './modules/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet,FontAwesomeModule, FooterComponent, HeaderComponent, CommonModule]
})
export class AppComponent {
  title = 'HControl';

  isLogged: boolean = false;
  currentRoute: string = '';
  private protectedRoutes = ['/auth', '/main'];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLogged$.subscribe(status => {
      this.isLogged = status;
    });

    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  isProtectedRoute(): boolean {
    return this.protectedRoutes.some(route => this.currentRoute.endsWith(route));
  }
}
