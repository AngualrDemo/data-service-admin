import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any): void {
    zip(this.httpClient.get('assets/tmp/app-data.json'))
      .pipe(
        catchError((res) => {
          console.warn(`StartupService.load: Network request failed`, res);
          resolve(null);
          return [];
        }),
      )
      .subscribe(
        ([appData]) => {
          // Application data
          const res: any = appData;
          // Application information: including site name, description, year
          this.settingService.setApp(res.app);
          // User information: including name, avatar, email address
          this.settingService.setUser(res.user);
          // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
          this.aclService.setFull(true);
          // Menu data, https://ng-alain.com/theme/menu
          this.menuService.add(res.menu);
          // Can be set page suffix title, https://ng-alain.com/theme/title
          this.titleService.suffix = res.app.name;
        },
        () => {},
        () => {
          resolve(null);
        },
      );
  }

  private viaMock(resolve: any, reject: any): void {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `网络安全大脑数据服务`,
      description: `网络安全大脑数据服务`,
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cipchk@qq.com',
      token: '123456789',
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: '首页',
        group: false,
        hideInBreadcrumb: true,
        children: [
          {
            text: '仪表盘',
            // link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' },
            children: [
              {
                text: '仪表盘',
                link: '/dashboard',
                icon: { type: 'icon', value: 'appstore' },
              },
            ],
          },
          {
            text: '服务管理',
            icon: { type: 'icon', value: 'api' },
            children: [
              {
                text: 'API服务接口',
                link: '/service-management/service-list',
                icon: { type: 'icon', value: 'api' },
              },
              {
                text: '应用服务',
                link: '/service-management/app-servit',
                icon: { type: 'icon', value: 'appstore' },
              },
            ],
          },
          {
            text: '权限管理',
            icon: { type: 'icon', value: 'setting' },
            children: [
              {
                text: '用户管理',
                link: '/purview-management/user-list',
                icon: { type: 'icon', value: 'user' },
              },
              {
                text: '角色管理',
                link: '/purview-management/role-list',
                icon: { type: 'icon', value: 'bulb' },
              },
            ],
          },
          {
            text: '订阅管理',
            icon: { type: 'icon', value: 'star' },
            children: [
              {
                text: '待审批',
                link: '/subscribe-manage/pending-review',
                icon: { type: 'icon', value: 'clock-circle' },
              },
              {
                text: '已审批',
                link: '/subscribe-manage/approved-list',
                icon: { type: 'icon', value: 'check-circle' },
              },
            ],
          },
        ],
      },
    ]);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMock(resolve, reject);
    });
  }
}
