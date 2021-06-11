import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceManagementAppServitComponent } from './app-servit.component';

describe('ServiceManagementAppServitComponent', () => {
  let component: ServiceManagementAppServitComponent;
  let fixture: ComponentFixture<ServiceManagementAppServitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceManagementAppServitComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceManagementAppServitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
