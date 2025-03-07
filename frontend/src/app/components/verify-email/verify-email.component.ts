import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  standalone:true,
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  token: string | null = null;
  verificationMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private _authService: AuthService, // Servicio para la verificación
    private router: Router
  ) {  }

  ngOnInit(): void {
    // Obtener el token de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.verifyEmail();
      } else {
        this.verificationMessage = 'Token no encontrado en la URL.';
      }
    });
  }

  verifyEmail(): void {
    if (this.token) {
      this._authService.verifyEmail(this.token).subscribe(
        (response) => {
          this.verificationMessage = response.message || 'Correo verificado con éxito!';

          // Iniciar temporizador de 1 segundo antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/auth']); // Redirige al login después de 1 segundo
          }, 1000); // 1000 milisegundos = 1 segundo
        },
        (error) => {
          this.verificationMessage = error.error.message || 'Error al verificar el correo.';
        }
      );
    }
  }
}
