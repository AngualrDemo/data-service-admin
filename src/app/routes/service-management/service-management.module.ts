import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ServiceManagementRoutingModule } from './service-management-routing.module';
import { ServiceManagementServiceListComponent } from './service-list/service-list.component';
import { ServiceManagementAppServitComponent } from './app-servit/app-servit.component';

const COMPONENTS: Type<void>[] = [ServiceManagementServiceListComponent, ServiceManagementAppServitComponent];

@NgModule({
  imports: [SharedModule, ServiceManagementRoutingModule],
  declarations: COMPONENTS,
})
export class ServiceManagementModule {}
