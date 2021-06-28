import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SFSchema, SFSelectWidgetSchema } from '@delon/form';

/** app(应用)服务  新增应用*/
@Component({
  selector: 'app-app-service-form',
  templateUrl: './app-service-form.component.html',
  styles: [],
})
export class AppServiceFormComponent implements OnInit {
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: 'API服务名称',
        minLength: 3,
        ui: {
          optionalHelp: 'API服务名称',
          placeholder: '请输入API服务名称',
        },
      },
      path: {
        type: 'string',
        title: '请求路径',
        minLength: 3,
        ui: {
          grid: {
            span: 16,
          },
          placeholder: '请输入API服务请求路径',
        },
      },
      requestClass: {
        type: 'string',
        title: '请求方法',
        enum: [
          { label: 'GET', value: 'WAIT_BUYER_PAY', otherData: 1 },
          { label: 'PUT', value: 'TRADE_SUCCESS' },
        ],
        default: 'WAIT_BUYER_PAY',
        ui: {
          widget: 'select',
          change: (value, orgData) => console.log(value, orgData),
        } as SFSelectWidgetSchema,
      },
      requestType: {
        type: 'string',
        title: '请求方式',
        enum: [
          { label: 'API网关', value: 'WAIT_BUYER_PAY', otherData: 1 },
          { label: '服务接口', value: 'TRADE_SUCCESS' },
        ],
        default: 'WAIT_BUYER_PAY',
        ui: {
          widget: 'select',
          change: (value, orgData) => console.log(value, orgData),
        } as SFSelectWidgetSchema,
      },
      status: {
        type: 'string',
        title: '服务分类',
        default: 'WAIT_BUYER_PAY',
        ui: {
          widget: 'select',
          asyncData: () => {
            return this.http.get('/get-dic-list');
          },
          change: (value, orgData) => console.log(value, orgData),
        } as SFSelectWidgetSchema,
      },

      dataSource: {
        type: 'string',
        title: '数据来源',
        enum: [
          { label: '本地安全数据', value: 'WAIT_BUYER_PAY', otherData: 1 },
          { label: '360云端数据（异步）', value: 'TRADE_SUCCESS' },
        ],
        default: 'WAIT_BUYER_PAY',
        ui: {
          widget: 'select',
          change: (value, orgData) => console.log(value, orgData),
        } as SFSelectWidgetSchema,
      },
      remark: {
        type: 'string',
        title: '接口描述',
        ui: {
          widget: 'textarea',
          autosize: true,
          grid: {
            span: 24,
          },
        },
      },
    },
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 8,
      },
    },
    required: ['name', 'status', 'remark', 'dataSource', 'requestType', 'path', 'requestClass'],
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
