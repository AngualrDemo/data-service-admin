import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { SFButton, SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd/message';

/** 数据集探查 */
@Component({
  selector: 'app-data-set-probe',
  templateUrl: './data-set-probe.component.html',
  styles: [],
})
export class DataSetProbeComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  button: SFButton = { search: '探查' };
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作区',
      width: '120px',
      fixed: 'right',
      buttons: [
        {
          text: '设为区域字段',
          iif: (record) => record.status == 2 || record.status == 0, // 状态为已下架才可以重新上架
          iifBehavior: 'disabled',
          click: (_record, modal) => console.log('设置为区域字段'),
        },
      ],
    },
  ];
  constructor(public msg: NzMessageService) {}

  ngOnInit(): void {}
}
