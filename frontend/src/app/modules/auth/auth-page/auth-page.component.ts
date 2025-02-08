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

  roles = ['COACH' ,'DIETITIST', 'PSYCHOLOGIST' ,'DEVELOPER' ,'USER'
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastrService,

  ) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      role: []
    });

    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    // Si las contraseñas coinciden...
    if (this.formRegister.value.password1 === this.formRegister.value.password2) {
      const user = {
        username: this.formRegister.value.username,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password1,
        role: this.formRegister.value.role
      };

      // Llamada al servicio AuthService
      this._authService.register(user).subscribe({
        next: data => {
          this._authService.setToken(data.token);
          this.router.navigate(['/feeding']); // Navega tras el registro
        },
        error: error => {
          console.log(error);
          this.toastr.warning('Email o username existen', 'Warning');
        }
      });
    } else {
      this.toastr.warning('Las contraseñas deben ser iguales', 'Warning');
    }
  }

  login() {

    const user = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    this._authService.login(user).subscribe({ // Llama al método login del servicio _usersService y se suscribe a la respuesta
      next: data => { // En caso de éxito (respuesta positiva)
        this._authService.setToken(data.token); // Guarda el token recibido en el servicio _usersService
        this.router.navigateByUrl('/feeding'); // Redirige al usuario a la ruta '/list'
        console.log("login ok")
      },
      error: error => { // En caso de error (respuesta negativa)
        console.log(error); // Imprime el error en la consola
        this.toastr.error('Email o contraseña incorrectos', 'Error'); // Muestra un mensaje de error usando toastr
      }
    }
    );
  }

  setIsLogin(value: boolean){
    this.isLoginPage = value;
  }

  loginRoute() {
    this.router.navigate(['/auth/login']);
  }

  registerRoute() {
    this.router.navigate(['/auth/register']);
  }
}
