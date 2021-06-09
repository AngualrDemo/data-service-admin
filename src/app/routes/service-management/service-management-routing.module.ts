import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceManagementServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [{ path: 'service-list', component: ServiceManagementServiceListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceManagementRoutingModule {}
