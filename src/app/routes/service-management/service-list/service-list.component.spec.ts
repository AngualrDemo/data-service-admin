import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceManagementServiceListComponent } from './service-list.component';

describe('ServiceManagementServiceListComponent', () => {
  let component: ServiceManagementServiceListComponent;
  let fixture: ComponentFixture<ServiceManagementServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceManagementServiceListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceManagementServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
