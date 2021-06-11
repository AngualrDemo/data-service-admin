import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-service-management-app-servit',
  templateUrl: './app-servit.component.html',
})
export class ServiceManagementAppServitComponent implements OnInit {
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
    { title: '应用图标', type: 'img', width: '50px', index: 'avatar' },
    {
      title: '应用显示名称',
      index: 'serviceName',
      width: '150px',
    },
    {
      title: '描述',
      index: 'serviceName',
      width: '200px',
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
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit(): void {}

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
