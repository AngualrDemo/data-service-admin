import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiServiceDetailComponent } from './api-service-detail.component';

describe('ApiServiceDetailComponent', () => {
  let component: ApiServiceDetailComponent;
  let fixture: ComponentFixture<ApiServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiServiceDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
