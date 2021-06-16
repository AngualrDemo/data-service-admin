import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-service-management-app-servit',
  templateUrl: './app-servit.component.html',
})
export class ServiceManagementAppServitComponent implements OnInit {
  url = `/app-service-list`;
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
    { title: '序号', type: 'no', width: '60px' },
    {
      title: '应用名称',
      index: 'serviceName',
      width: '150px',
      filter: {
        type: 'keyword',
        fn: (filter, record) => !filter.value || record.name.indexOf(filter.value) !== -1,
      },
    },
    { title: '应用图标', type: 'img', width: '100px', index: 'avatar' },
    {
      title: '应用显示名称',
      index: 'serviceName2',
      width: '150px',
    },
    {
      title: '描述',
      index: 'description',
      width: '200px',
    },
    {
      title: '服务分类',
      index: 'serviceClass',
      width: '100px',
      filter: {
        type: 'keyword',
        fn: (filter, record) => !filter.value || record.name.indexOf(filter.value) !== -1,
      },
    },
    {
      title: '状态',
      type: 'badge',
      index: 'status',
      width: '100px',
      filter: {
        menus: [
          { text: '创建中', value: '0' },
          { text: '待上架', value: '1' },
          { text: '已上架', value: '2' },
          { text: '已下架', value: '3' },
        ],
        fn: (filter, record) => record.age >= filter.value[0] && record.age <= filter.value[1],
        multiple: false,
      },
      badge: {
        0: { text: '创建中', color: 'default' },
        1: { text: '待上架', color: 'processing' },
        2: { text: '已上架', color: 'success' },
        3: { text: '已下架', color: 'warning' },
      },
    },
    { title: '时间', type: 'date', index: 'updatedAt', width: '150px' },
    {
      title: '操作区',
      width: '120px',
      fixed: 'right',
      buttons: [
        {
          text: '上架',
          iif: (record) => record.status == 2 || record.status == 0, // 状态为已下架才可以重新上架
          iifBehavior: 'disabled',
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '下架',
          iif: (record) => record.status == 1, // 状态为已上架才可以重新下架
          iifBehavior: 'disabled',
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '更多',
          children: [
            {
              text: `详情`,
              icon: 'file',
              click: (record) => this.message.error(`${record.id === 1 ? `过期` : `正常`}【${record.name}】`),
            },
            {
              text: '编辑',
              icon: 'edit',
              type: 'modal',
              modal: {
                // component: ApiServiceAddComponent,
              },
              click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
            },
            {
              text: `注销`,
              iif: (record) => record.status == 0, // 状态为待上架的才可注销
              iifBehavior: 'disabled',
              icon: 'logout',
              click: (record) => this.message.error(`${record.id === 1 ? `过期` : `正常`}【${record.name}】`),
            },
          ],
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) {}

  ngOnInit(): void {}

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
