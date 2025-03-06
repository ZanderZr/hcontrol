import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Notification } from '../../modules/auth/interfaces/notification';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** Título de la ruta actual.*/
  title: string = '';

  hasNotifications: boolean = false;
  /** ID del usuario. */
  idUser!: number;

  /**
   * Constructor del componente, inyecta dependencias necesarias.
   * @param router - Instancia del servicio Router para navegar entre rutas.
   * @param activatedRoute - Instancia del servicio ActivatedRoute para obtener la ruta activa.
   * @param cdr - Instancia del servicio ChangeDetectorRef para la detección de cambios manual.
   * @param location - Instancia del servicio Location para manejar la navegación hacia atrás.
   * @param _apiService - Instancia del servicio ApiService para interactuar con la API.
   * @param _authService - Instancia del servicio AuthService para manejar la autenticación y el usuario.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private _authService: AuthService
  ) {

  }

  /**
   * Método llamado al inicializar el componente.
   * Configura la suscripción para detectar cambios en la ruta y carga el título.
   */
  ngOnInit() {

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getRouteTitle(this.activatedRoute))
      )
      .subscribe((title) => {
        this.title = title || 'Default Title';
      });

      this._authService.getNotifications().subscribe(
             (data: Notification[]) => {
              this.hasNotifications = data.length > 0;
             },
             (error) => {
               console.error('Error al cargar notificaciones desde el socket:', error);
             }
           );
    this.cdr.detectChanges();
  }

  /**
   * Función recursiva para obtener el título de la ruta activa.
   * @param route - La ruta activa en el componente.
   * @returns El título de la ruta o null si no se encuentra.
   */
  private getRouteTitle(route: ActivatedRoute): string | null {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild;
    }
    return child.snapshot.data['title'] || null;
  }

  /**
   * Navega a la vista de configuración cuando se hace clic en el botón de configuración.
   */
  settingsButton() {
    this.router.navigate(['options']);
  }

  /**
   * Función que maneja el evento de clic en el botón de perfil.
   * Actualmente solo imprime un mensaje en la consola.
   */
  profileButton() {
    console.log('profile');
  }

  /**
   * Regresa a la vista anterior usando la función back de Location.
   */
  back() {
    this.location.back();
  }
}
