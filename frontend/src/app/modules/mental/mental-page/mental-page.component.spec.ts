import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentalPageComponent } from './mental-page.component';

describe('MentalPageComponent', () => {
  let component: MentalPageComponent;
  let fixture: ComponentFixture<MentalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
