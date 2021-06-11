import { Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-service-management-service-list',
  templateUrl: './service-list.component.html',
})
export class ServiceManagementServiceListComponent implements OnInit {
  users: STData[] = [];
  url = `/service-list`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  columns: STColumn[] = [
    { title: '序号', type: 'no', width: '60px' },
    {
      title: '服务名称',
      index: 'serviceName',
      fixed: 'left',
      width: '150px',
      filter: {
        type: 'keyword',
        fn: (filter, record) => !filter.value || record.name.indexOf(filter.value) !== -1,
      },
    },
    {
      title: '描述',
      width: '150px',
      index: 'description',
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
      title: '调用次数',
      width: '150px',
      index: 'callServiceNum',
      type: 'number',
    },

    {
      title: '更新日期',
      index: 'updatedAt',
      width: '175px',
      type: 'date',
    },
    {
      title: '创建人',
      index: 'createdBy',
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
          { text: '待上架', value: '0' },
          { text: '已上架', value: '1' },
          { text: '已下架', value: '2' },
          { text: '已注销', value: '3' },
        ],
        fn: (filter, record) => record.age >= filter.value[0] && record.age <= filter.value[1],
        multiple: false,
      },
      badge: {
        0: { text: '待上架', color: 'processing' },
        1: { text: '已上架', color: 'success' },
        2: { text: '已下架', color: 'warning' },
        3: { text: '已注销', color: 'error' },
      },
    },
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
        // {
        //   icon: 'delete',
        //   type: 'del',
        //   pop: {
        //     title: '确定要删除这条记录吗?',
        //     okType: 'danger',
        //     icon: 'star',
        //   },
        //   click: (record, _modal, comp) => {
        //     this.message.success(`成功删除【${record.name}】`);
        //     comp!.removeRow(record);
        //   },
        //   iif: (record) => record.status === 3,
        //   iifBehavior: 'disabled',
        // },
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
                // component: DemoModalComponent,
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
  page: STPage = { position: 'bottom', showSize: true, total: true };
  constructor(private message: NzMessageService) {}
  ngOnInit(): void {
    const data = Array(100)
      .fill({})
      .map((_, idx) => ({
        id: idx + 1,
        name: `name ${idx + 1}`,
        age: Math.ceil(Math.random() * 10) + 20,
        status: Math.floor(Math.random() * 5) + 1,
      }));
    of(data)
      .pipe(delay(500))
      .subscribe((res) => (this.users = res));
  }

  change(e: STChange): void {
    console.log(e);
  }
}
