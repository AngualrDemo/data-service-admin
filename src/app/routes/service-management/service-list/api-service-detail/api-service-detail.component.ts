import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
/** api(接口)服务  详情页面*/
@Component({
  selector: 'app-api-service-detail',
  templateUrl: './api-service-detail.component.html',
  styles: [],
})
export class ApiServiceDetailComponent implements OnInit {
  constructor(public msg: NzMessageService) {}

  ngOnInit(): void {}
}
