import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeManagePendingReviewComponent } from './pending-review/pending-review.component';
import { SubscribeManageApprovedListComponent } from './approved-list/approved-list.component';

const routes: Routes = [
  { path: 'pending-review', component: SubscribeManagePendingReviewComponent },
  { path: 'approved-list', component: SubscribeManageApprovedListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribeManageRoutingModule {}
