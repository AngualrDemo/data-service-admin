import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceMonitoringServiceMonitoringListComponent } from './service-monitoring-list/service-monitoring-list.component';

const routes: Routes = [{ path: 'service-monitoring-list', component: ServiceMonitoringServiceMonitoringListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceMonitoringRoutingModule {}
