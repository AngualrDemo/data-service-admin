import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ServiceMonitoringRoutingModule } from './service-monitoring-routing.module';
import { ServiceMonitoringServiceMonitoringListComponent } from './service-monitoring-list/service-monitoring-list.component';

const COMPONENTS: Type<void>[] = [ServiceMonitoringServiceMonitoringListComponent];

@NgModule({
  imports: [SharedModule, ServiceMonitoringRoutingModule],
  declarations: COMPONENTS,
})
export class ServiceMonitoringModule {}
