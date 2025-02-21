import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User, UserRole } from '../../modules/auth/interfaces/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { After } from 'v8';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  title: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getRouteTitle(this.activatedRoute))
      )
      .subscribe(title => {
        this.title = title || 'Default Title';
      });
      this.cdr.detectChanges();
  }

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
