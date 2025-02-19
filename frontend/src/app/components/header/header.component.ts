import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User, UserRole } from '../../modules/auth/interfaces/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { After } from 'v8';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked{

  title: string = "";
  user: User = {
    id: 1,
    email: "john.doe@example.com",
    username: "johnnyD",
    password: "1234",
    role: UserRole.DEVELOPER
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}
  ngAfterViewChecked(): void {
this.cdr.detectChanges();
  }

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
}
