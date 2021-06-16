import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceMonitoringServiceMonitoringListComponent } from './service-monitoring-list.component';

describe('ServiceMonitoringServiceMonitoringListComponent', () => {
  let component: ServiceMonitoringServiceMonitoringListComponent;
  let fixture: ComponentFixture<ServiceMonitoringServiceMonitoringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceMonitoringServiceMonitoringListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMonitoringServiceMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
