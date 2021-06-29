import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SFSchema, SFSelectWidgetSchema, SFUploadWidgetSchema } from '@delon/form';

/** 新增用户  */
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  /** 新增用户的json schema 配置 */
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '账号名',
        minLength: 4,
        maxLength: 20,
        ui: {
          placeholder: '请输入账号名',
        },
      },
      path: {
        type: 'string',
        title: '密码',
        minLength: 8,
        maxLength: 16,
        ui: {
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      requestClass: {
        type: 'string',
        title: '用户所属角色',
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
        title: '用户所属公安部门',
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
        title: '用户姓名',
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
        title: '用户单位',
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
      userKey: {
        type: 'string',
        title: '用户秘钥',
        minLength: 3,
        readOnly: true,
        ui: {
          optionalHelp: '系统自动生成的36位随机字串，用于API调用时使用',
          placeholder: '系统自动生成',
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
