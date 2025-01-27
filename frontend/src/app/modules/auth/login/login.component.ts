import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formLogin: FormGroup;
  @Output() toggleLoginEvent = new EventEmitter<boolean>(); // Evento para cambiar el valor de inLogin

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _authService: AuthService) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    // if(this._authService.getUser()){
    //   this.router.navigate(['/list']);
    // }
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

  registerRoute(){
    this.router.navigate(['/auth/register']);
  }
}
