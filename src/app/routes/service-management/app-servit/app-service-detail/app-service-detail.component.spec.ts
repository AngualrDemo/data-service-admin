import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServiceDetailComponent } from './app-service-detail.component';

describe('AppServiceDetailComponent', () => {
  let component: AppServiceDetailComponent;
  let fixture: ComponentFixture<AppServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppServiceDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
