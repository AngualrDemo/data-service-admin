import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManageUserListComponent } from './user-list/user-list.component';
import { UserManageRoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  { path: 'user-list', component: UserManageUserListComponent },
  { path: 'role-list', component: UserManageRoleListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManageRoutingModule {}
