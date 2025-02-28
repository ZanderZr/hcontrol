import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User, UserRole } from '../../modules/auth/interfaces/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { After } from 'v8';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  title: string = "";
  hasNotifications:boolean=false;
  idUser!:number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private _apiService: ApiService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    // const user = this._authService.user; // ⬅️ Guarda el usuario en una variable

    // if (user && user.id) {  // ✅ Verifica si user no es undefined
    //   this.idUser = user.id;
    // } else {
    //   console.error("Usuario no definido en AuthService");
    //   return; // 🔥 Evita continuar si no hay usuario
    // }

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getRouteTitle(this.activatedRoute))
      )
      .subscribe(title => {
        this.title = title || 'Default Title';
      });

    this.cdr.detectChanges();
    // this.loadNotifications(); // Cargar inicialmente

    // setInterval(() => {
    //   this.loadNotifications();
    // }, 5000); // Se repite cada 5 segundos
  }

    // loadNotifications() {
    //   this._apiService.getAllNotifications(this.idUser).subscribe(
    //     (data) => {
    //       this.hasNotifications = data.length > 0;
    //     },
    //     (error) => {
    //       console.error('Error al cargar notificaciones:', error);
    //     }
    //   );
    // }
  // Función recursiva para obtener el título de la ruta activa
  private getRouteTitle(route: ActivatedRoute): string | null {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild;
    }
    return child.snapshot.data['title'] || null;
  }

  settingsButton(){
    this.router.navigate(['options']);
  }

  profileButton(){
    console.log("profile")
  }

  back(){
    this.location.back();
  }
}
