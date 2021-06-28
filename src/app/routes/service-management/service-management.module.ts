import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ServiceManagementRoutingModule } from './service-management-routing.module';
import { ServiceManagementServiceListComponent } from './service-list/service-list.component';
import { ServiceManagementAppServitComponent } from './app-servit/app-servit.component';
import { ApiServiceAddComponent } from './service-list/api-service-add/api-service-add.component';
import { AppServiceFormComponent } from './app-servit/app-service-form/app-service-form.component';
import { ApiServiceDetailComponent } from './service-list/api-service-detail/api-service-detail.component';
import { AppServiceDetailComponent } from './app-servit/app-service-detail/app-service-detail.component';

const COMPONENTS: Type<void>[] = [
  ServiceManagementServiceListComponent,
  ServiceManagementAppServitComponent,
  ApiServiceAddComponent,
  AppServiceFormComponent,
  ApiServiceDetailComponent,
  AppServiceDetailComponent,
];

/** api服务管理，Module */
@NgModule({
  imports: [SharedModule, ServiceManagementRoutingModule],
  declarations: COMPONENTS,
  entryComponents: [ApiServiceAddComponent, AppServiceFormComponent, ApiServiceDetailComponent, AppServiceDetailComponent],
})
export class ServiceManagementModule {}
