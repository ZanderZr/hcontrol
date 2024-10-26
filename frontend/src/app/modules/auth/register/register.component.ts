import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from "@angular/router";
import { PageComponent } from '../../../components/page/page.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    PageComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this._authService.getToken()) {
      this.router.navigate(['/list']);
    }
  }

  register() {
    // Si las contraseñas coinciden...
    if (this.formRegister.value.password1 === this.formRegister.value.password2) {
      const user = {
        username: this.formRegister.value.username,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password1
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
}
function withInterceptorsFromDi(): import("@angular/common/http").HttpFeature<import("@angular/common/http").HttpFeatureKind> {
  throw new Error('Function not implemented.');
}

