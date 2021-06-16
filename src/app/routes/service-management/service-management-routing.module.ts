import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceManagementServiceListComponent } from './service-list/service-list.component';
import { ServiceManagementAppServitComponent } from './app-servit/app-servit.component';
import { ApiServiceAddComponent } from './service-list/api-service-add/api-service-add.component';

const routes: Routes = [
  { path: 'service-list', component: ServiceManagementServiceListComponent },
  { path: 'app-servit', component: ServiceManagementAppServitComponent },
  { path: 'api-service-add', component: ApiServiceAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceManagementRoutingModule {}
