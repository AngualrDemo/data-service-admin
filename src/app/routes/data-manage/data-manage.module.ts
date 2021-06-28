import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { DataManageRoutingModule } from './data-manage-routing.module';

import { DataSetDownloadComponent } from './data-set-list/data-set-download/data-set-download.component';
import { DataSetFormComponent } from './data-set-list/data-set-form/data-set-form.component';
import { DataManageDataSetListComponent } from './data-set-list/data-set-list.component';
import { DataSetProbeComponent } from './data-set-list/data-set-probe/data-set-probe.component';
import { DataSetUpdateComponent } from './data-set-list/data-set-update/data-set-update.component';
import { DataSetViewComponent } from './data-set-list/data-set-view/data-set-view.component';

const COMPONENTS: Type<void>[] = [
  DataManageDataSetListComponent,
  DataSetProbeComponent,
  DataSetDownloadComponent,
  DataSetUpdateComponent,
  DataSetViewComponent,
  DataSetFormComponent,
];

/** 数据集管理 | 数据管理，Module */
@NgModule({
  imports: [SharedModule, DataManageRoutingModule],
  declarations: COMPONENTS,
})
export class DataManageModule {}
