import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManageDataSetListComponent } from './data-set-list/data-set-list.component';

const routes: Routes = [{ path: 'data-set-list', component: DataManageDataSetListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataManageRoutingModule {}
