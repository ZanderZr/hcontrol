import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-google-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './google-auth-callback.component.html',
  styleUrl: './google-auth-callback.component.scss'
})
export class GoogleAuthCallbackComponent {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        console.log("✅ Token recibido:", token);
        if (typeof window !== 'undefined') {
          this.authService.saveToken(token, false);
          const decoded: any = jwtDecode(token);
          console.log("✅ Usuario decodificado:", decoded);
          const user: any = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            role: decoded.role,
            verified: decoded.verified
          }
          this.authService.saveUserData(user);
        }
        this.authService.isLoggedSubject.next(true);
        this.router.navigate(['/home']); // ✅ Redirige a la página protegida
      } else {
        console.log("❌ No se recibió token en la URL");
        this.router.navigate(['/login']); // 🚨 Redirige si no hay token
      }
    });
  }
}