import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { DialogService } from 'ng-devui';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user-manage-user-list',
  templateUrl: './user-list.component.html',
})
export class UserManageUserListComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private dialogService: DialogService) {}

  ngOnInit(): void {}

  /** 弹出新增用户的弹框 */
  add(): void {
    const results = this.dialogService.open({
      id: 'dialog-user-form',
      width: '80%',
      maxHeight: '500px',
      title: '新增用户',
      content: UserFormComponent,
      dialogtype: 'standard',
      beforeHidden: () => this.beforeHidden(),
      backdropCloseable: true,
      placement: 'top',
      buttons: [
        {
          cssClass: 'primary',
          text: '保存',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }
  /** 二次确认是否关闭新增用户对话框 */
  beforeHidden(): Promise<boolean> {
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-user-form-tow',
        width: '300px',
        maxHeight: '600px',
        title: '',
        content: '确认保存此页面',
        backdropCloseable: false,
        dialogtype: 'warning',
        buttons: [
          {
            cssClass: 'primary',
            text: '保存',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            },
          },
          {
            id: 'btn-cancel',
            cssClass: '取消',
            text: 'Cancel',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(false);
            },
          },
        ],
      });
    });
  }
}
