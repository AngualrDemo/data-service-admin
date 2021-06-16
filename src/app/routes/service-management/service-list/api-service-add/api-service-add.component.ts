import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFSelectWidgetSchema } from '@delon/form';
interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}
@Component({
  selector: 'app-api-service-add',
  templateUrl: './api-service-add.component.html',
  styles: [],
})
export class ApiServiceAddComponent implements OnInit {
  tabs = [1, 2, 3];
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

  ngOnInit() {
    this.listOfMapData.forEach((item) => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });

    console.log(this.listOfMapData, this.mapOfExpandedData);
  }
  submit(value: any) {}
  onClick($event) {}

  listOfMapData: TreeNodeInterface[] = [
    {
      key: `1`,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: `1-1`,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: `1-2`,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: `1-2-1`,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: `1-3`,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: `1-3-1`,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: `1-3-1-1`,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: `1-3-1-2`,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: `2`,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach((d) => {
          const target = array.find((a) => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
}
