import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingPageComponent } from './feeding-page.component';

describe('FeedingPageComponent', () => {
  let component: FeedingPageComponent;
  let fixture: ComponentFixture<FeedingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
