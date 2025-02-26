import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageComponent } from '../../page/page.component';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
interface UserSettings {
  username: string;
  email: string;
  notifications: boolean;
  darkMode: boolean;
}

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PageComponent,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.scss'
})


export class OptionsPageComponent {
  settings: UserSettings = {
    username: '',
    email: '',
    notifications: false,
    darkMode: false
  };

  constructor(
    private _authService:AuthService,
    private router: Router
  ) {
    this.loadSettings();

  }

  loadSettings(): void {
    // Ejemplo: carga de settings desde localStorage
    const stored = localStorage.getItem('userSettings');
    if (stored) {
      this.settings = JSON.parse(stored);
    }
  }

  saveSettings(): void {
    // Ejemplo: guarda settings en localStorage
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    alert('Configuración guardada');
  }

  changePassword(){

  }

  changeEmail(){

  }

  logout(){
    this._authService.logout();
    this.router.navigate(['/home']);

  }
}
