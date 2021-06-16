import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { SubscribeManageRoutingModule } from './subscribe-manage-routing.module';
import { SubscribeManagePendingReviewComponent } from './pending-review/pending-review.component';
import { SubscribeManageApprovedListComponent } from './approved-list/approved-list.component';

const COMPONENTS: Type<void>[] = [SubscribeManagePendingReviewComponent, SubscribeManageApprovedListComponent];

@NgModule({
  imports: [SharedModule, SubscribeManageRoutingModule],
  declarations: COMPONENTS,
})
export class SubscribeManageModule {}
