import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { UserManageRoutingModule } from './user-manage-routing.module';
import { UserManageUserListComponent } from './user-list/user-list.component';
import { UserManageRoleListComponent } from './role-list/role-list.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';

const COMPONENTS: Type<void>[] = [UserManageUserListComponent, UserManageRoleListComponent, UserFormComponent];

@NgModule({
  imports: [SharedModule, UserManageRoutingModule],
  declarations: COMPONENTS,
  entryComponents: [UserFormComponent],
})
export class UserManageModule {}
