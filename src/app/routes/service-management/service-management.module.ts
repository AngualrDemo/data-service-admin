import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ServiceManagementRoutingModule } from './service-management-routing.module';
import { ServiceManagementServiceListComponent } from './service-list/service-list.component';
import { ServiceManagementAppServitComponent } from './app-servit/app-servit.component';
import { ApiServiceAddComponent } from './service-list/api-service-add/api-service-add.component';

const COMPONENTS: Type<void>[] = [ServiceManagementServiceListComponent, ServiceManagementAppServitComponent, ApiServiceAddComponent];

@NgModule({
  imports: [SharedModule, ServiceManagementRoutingModule],
  declarations: COMPONENTS,
  entryComponents: [ApiServiceAddComponent],
})
export class ServiceManagementModule {}
