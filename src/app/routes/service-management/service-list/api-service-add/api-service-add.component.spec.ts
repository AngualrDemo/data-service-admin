import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiServiceAddComponent } from './api-service-add.component';

describe('ApiServiceAddComponent', () => {
  let component: ApiServiceAddComponent;
  let fixture: ComponentFixture<ApiServiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiServiceAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
