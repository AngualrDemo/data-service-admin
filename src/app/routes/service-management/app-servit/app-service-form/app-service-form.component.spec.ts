import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServiceFormComponent } from './app-service-form.component';

describe('AppServiceFormComponent', () => {
  let component: AppServiceFormComponent;
  let fixture: ComponentFixture<AppServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppServiceFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
