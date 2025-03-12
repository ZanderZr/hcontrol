import { CredentialResponse } from '@react-oauth/google';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, PageComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthPageComponent {
  formRegister: FormGroup;
  formLogin: FormGroup;
  isLoginPage: boolean = true;

  roles = ['COACH', 'DIETITIST', 'PSYCHOLOGIST', 'USER'];

  /**
   * Constructor del componente, que inyecta las dependencias necesarias para el funcionamiento del formulario.
   * @param {Router} router - Servicio para navegar entre rutas.
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos.
   * @param {AuthService} _authService - Servicio que maneja la autenticación.
   * @param {ToastrService} toastr - Servicio para mostrar notificaciones.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastrService,
  ) {
    // Inicializa el formulario de registro con los campos necesarios y sus validaciones
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required],
    });

    // Inicializa el formulario de inicio de sesión con los campos necesarios y sus validaciones
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  /**
   * Maneja el inicio de sesión del usuario. Si el formulario es válido, realiza la autenticación.
   * Muestra mensajes de error o éxito según el resultado.
   */
  async login() {
    // Verifica si el formulario es válido
    if (this.formLogin.invalid) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Desestructura los valores del formulario
      const { email, password, rememberMe } = this.formLogin.value;
      // Realiza la autenticación usando el servicio AuthService
      const response = await lastValueFrom(
        this._authService.login(email, password)
      );
      // Guarda el token de autenticación y la opción de "recordarme"
      this._authService.saveToken(response.token, rememberMe);
      // Redirige a la página de inicio
      this.router.navigate(['home']);
    } catch (error) {
      this.toastr.error('Credenciales incorrectas');
    }
  }

  /**
   * Maneja el registro de un nuevo usuario. Si el formulario es válido y las contraseñas coinciden,
   * realiza el registro y muestra un mensaje de éxito.
   */
  async register() {
    // Verifica si el formulario de registro es válido
    if (this.formRegister.invalid) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }

    // Verifica si las contraseñas coinciden
    if (this.formRegister.value.password1 !== this.formRegister.value.password2) {
      this.toastr.error('Las contraseñas no coinciden');
      return;
    }

    try {
      // Desestructura los valores del formulario
      const { email, username, password1, role } = this.formRegister.value;
      // Realiza el registro usando el servicio AuthService
      await lastValueFrom(this._authService.register(email, username, password1, role));
      this.toastr.success('Registro exitoso. Ahora puedes iniciar sesión.');
      // Cambia a la página de inicio de sesión
      this.isLoginPage = true;
    } catch (error) {
      this.toastr.error('Error en el registro');
    }
  }

  /**
   * Alterna entre las vistas de inicio de sesión y registro.
   */
  toggleForm() {
    this.isLoginPage = !this.isLoginPage;
  }

  googleLogin() {

  }
}
