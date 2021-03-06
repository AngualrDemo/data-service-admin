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
      name: `??????????????????????????????`,
      description: `??????????????????????????????`,
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
    this.aclService.setFull(false);
    this.aclService.setRole(['user']);
    this.aclService.attachAbility([1, 2, 3]);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: '??????',
        group: false,
        hideInBreadcrumb: true,
        children: [
          {
            text: '?????????',
            // link: '/dashboard',
            acl: ['user'],
            icon: { type: 'icon', value: 'appstore' },
          },
          {
            text: '????????????',
            icon: { type: 'class', value: 'iconfont icon-xingzhuangjiehe' },
            children: [
              {
                text: 'API????????????',
                link: '/service-management/service-list',
                icon: { type: 'class', value: 'iconfont icon-fuwujiekou' },
              },
              {
                text: '????????????',
                link: '/service-management/app-servit',
                icon: { type: 'class', value: 'iconfont icon-yingyongfuwu' },
              },
            ],
          },
          {
            text: '????????????',
            link: '/data-manage/data-set-list',
            icon: { type: 'class', value: 'iconfont icon-shujujiguanli' },
          },
          {
            text: '????????????',
            icon: { type: 'class', value: 'iconfont icon-fuwujiankong' },
            link: '/service-monitoring/service-monitoring-list',
          },
          {
            text: '????????????',
            icon: { type: 'class', value: 'iconfont icon-dingyueguanlitubiao' },
            children: [
              {
                text: '?????????',
                link: '/subscribe-manage/pending-review',
                icon: { type: 'class', value: 'iconfont icon-daishenpi' },
              },
              {
                text: '?????????',
                link: '/subscribe-manage/approved-list',
                icon: { type: 'class', value: 'iconfont icon-yishenpi' },
              },
            ],
          },
          {
            text: '????????????',
            icon: { type: 'class', value: 'iconfont icon-quanxianguanli' },
            children: [
              {
                text: '????????????',
                link: '/purview-management/user-list',
                icon: { type: 'class', value: 'iconfont icon-user' },
              },
              {
                text: '????????????',
                externalLink: 'http://www.baidu.com',
                target: '_blank',
                icon: { type: 'class', value: 'iconfont icon-jiaoseguanli' },
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
      // mock??????????????????????????????????????????viaMock ????????????????????????????????????????????????????????????????????????
      this.viaMock(resolve, reject);
    });
  }
}
