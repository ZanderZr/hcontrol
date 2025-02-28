import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../page/page.component';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, PageComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  formRegister: FormGroup;
  formLogin: FormGroup;
  isLoginPage: boolean = true;

  roles = ['COACH', 'DIETITIST', 'PSYCHOLOGIST', 'USER'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastrService
  ) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

  }

  async login() {
    if (this.formLogin.invalid) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }

    try {
      const { email, password, rememberMe } = this.formLogin.value; // Obtener el nuevo campo
      const response = await lastValueFrom(this._authService.login(email, password));
      this._authService.saveToken(response.token, rememberMe);
      this.toastr.success('Inicio de sesión exitoso');
      this.router.navigate(['home']);
    } catch (error) {
      this.toastr.error('Credenciales incorrectas');
    }
  }

  async register() {
    if (this.formRegister.invalid) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }

    if (this.formRegister.value.password1 !== this.formRegister.value.password2) {
      this.toastr.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const { email, username, password1, role } = this.formRegister.value;
      await lastValueFrom(this._authService.register(email, username, password1, role));
      this.toastr.success('Registro exitoso. Ahora puedes iniciar sesión.');
      this.isLoginPage = true;
    } catch (error) {
      this.toastr.error('Error en el registro');
    }
  }

  toggleForm() {
    this.isLoginPage = !this.isLoginPage;
  }
}
