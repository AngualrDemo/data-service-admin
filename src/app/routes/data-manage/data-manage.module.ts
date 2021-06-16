import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { DataManageRoutingModule } from './data-manage-routing.module';
import { DataManageDataSetListComponent } from './data-set-list/data-set-list.component';

const COMPONENTS: Type<void>[] = [DataManageDataSetListComponent];

@NgModule({
  imports: [SharedModule, DataManageRoutingModule],
  declarations: COMPONENTS,
})
export class DataManageModule {}
