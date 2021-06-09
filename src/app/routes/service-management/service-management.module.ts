import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ServiceManagementRoutingModule } from './service-management-routing.module';
import { ServiceManagementServiceListComponent } from './service-list/service-list.component';

const COMPONENTS: Type<void>[] = [ServiceManagementServiceListComponent];

@NgModule({
  imports: [SharedModule, ServiceManagementRoutingModule],
  declarations: COMPONENTS,
})
export class ServiceManagementModule {}
