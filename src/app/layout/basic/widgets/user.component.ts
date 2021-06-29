import { ChangeDetectionStrategy, Component, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User } from '@delon/theme';
import { DialogService, DocumentRef, ModalComponent } from 'ng-devui';
import { ApiServiceAddComponent } from 'src/app/routes/service-management/service-list/api-service-add/api-service-add.component';

@Component({
  selector: 'header-user',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <nz-avatar [nzSrc]="user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{ user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          个人设置
        </div>
        <div nz-menu-item (click)="changePassword()">
          <i nz-icon nzType="setting" class="mr-sm"></i>
          修改密码
        </div>
        <!-- <div nz-menu-item routerLink="/exception/trigger">
          <i nz-icon nzType="close-circle" class="mr-sm"></i>
          触发错误
        </div> -->
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent implements OnDestroy {
  get user(): User {
    return this.settings.user;
  }
  /** 修改密码 dialog 页面跳转后注意关闭此对话框*/
  changePasswordDialog: {
    modalInstance: ModalComponent;
    modalContentInstance: any;
  };
  constructor(
    private settings: SettingsService,
    private router: Router,
    private dialogService: DialogService,
    private documentRef: DocumentRef,
    private renderer: Renderer2,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnDestroy(): void {
    if (this.changePasswordDialog) this.changePasswordDialog.modalInstance.hide();
  }

  logout(): void {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
  changePassword() {
    const me = this;
    me.changePasswordDialog = me.dialogService.open({
      id: 'dialog-change-password',
      width: '80%',
      maxHeight: '500px',
      title: '修改密码',
      content: ApiServiceAddComponent,
      dialogtype: 'standard',
      backdropCloseable: true,
      placement: 'top',
      buttons: [
        {
          cssClass: 'primary',
          text: '保存',
          handler: ($event: Event) => {
            me.changePasswordDialog.modalInstance.hide();
          },
        },
      ],
    });
  }
}
