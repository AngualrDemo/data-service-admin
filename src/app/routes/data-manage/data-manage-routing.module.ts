import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManageDataSetListComponent } from './data-set-list/data-set-list.component';

const routes: Routes = [{ path: 'data-set-list', component: DataManageDataSetListComponent }];
/** 数据集管理 | 数据管理，模块routes配置 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataManageRoutingModule {}
