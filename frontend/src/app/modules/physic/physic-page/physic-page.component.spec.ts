import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicPageComponent } from './physic-page.component';

describe('PhysicPageComponent', () => {
  let component: PhysicPageComponent;
  let fixture: ComponentFixture<PhysicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
