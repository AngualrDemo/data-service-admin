import { MockRequest } from '@delon/mock';

const files = {
  data: [
    {
      data: {
        name: 'list',
        size: '200mb',
        type: 'Array',
      },
      children: [
        {
          data: {
            name: 'listObj',
            size: '25mb',
            type: 'object',
          },
          children: [
            {
              data: {
                name: 'age',
                size: '10mb',
                type: 'string',
              },
            },
            {
              data: {
                name: 'name',
                size: '10mb',
                type: 'string',
              },
            },
            {
              data: {
                name: 'sex',
                size: '5mb',
                type: 'string',
              },
            },
          ],
        },
        {
          data: {
            name: 'editor.app',
            size: '25mb',
            type: 'object',
          },
          children: [
            {
              data: {
                name: 'angular.app',
                size: '10mb',
                type: 'Application',
              },
            },
            {
              data: {
                name: 'cli.app',
                size: '10mb',
                type: 'Application',
              },
            },
            {
              data: {
                name: 'mobile.app',
                size: '5mb',
                type: 'Application',
              },
            },
          ],
        },
      ],
    },
    {
      data: {
        name: 'params',
        size: '20mb',
        type: 'object',
      },
      children: [
        {
          data: {
            name: 'backup-1.zip',
            size: '10mb',
            type: 'Zip',
          },
        },
        {
          data: {
            name: 'backup-2.zip',
            size: '10mb',
            type: 'Zip',
          },
        },
      ],
    },
  ],
};

const list: any[] = [];
const appList: any[] = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    serviceName: `一个服务名称一个服务名称一个服务名称${i}`, // 服务名称
    description: '这是一段描述', // 描述
    callServiceNum: Math.ceil(Math.random() * 10000000000000), //服务调用次数
    status: Math.floor(Math.random() * 10) % 4, // 状态
    createdBy: 'admin', // 创建人
    serviceClass: Math.floor(Math.random() * 10) % 4, // 状态
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`), // 更新日期
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

for (let i = 0; i < total; i += 1) {
  appList.push({
    id: i + 1,
    appName: `一个服务名称一个服务名称一个服务名称${i}`, // 服务名称
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    appName2: `一个服务名称一个服务名称一个服务名称${i}`, // 服务显示名称
    description: '这是一段描述', // 描述
    status: Math.floor(Math.random() * 10) % 4, // 状态
    createdBy: 'admin', // 创建人
    serviceClass: Math.floor(Math.random() * 10) % 4, // 状态
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`), // 更新日期
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}
function genServiceData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter((data) => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}
function genAppServiceData(params: any): { total: number; list: any[] } {
  let ret = [...appList];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter((data) => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}
function saveData(id: number, value: any): { msg: string } {
  const item = list.find((w) => w.id === id);
  if (!item) {
    return { msg: '无效用户信息' };
  }
  Object.assign(item, value);
  return { msg: 'ok' };
}
/**服务分类 */
function getServiceClass() {
  return [
    { label: '威胁情报查询服务', value: 'WAIT_BUYER_PAY', otherData: 1 },
    { label: '资产测绘查询服务', value: 'TRADE_SUCCESS' },
    { label: '威胁分析应用', value: 'TRADE_FINISHED' },
    { label: '监测应用', value: 'TRADE_APP' },
  ];
}
export const SERVICE = {
  '/service-list': (req: MockRequest) => genServiceData(req.queryString),
  '/app-service-list': (req: MockRequest) => genAppServiceData(req.queryString),
  '/get-dic-list': (req: MockRequest) => getServiceClass(),
  'parms/list': (req: MockRequest) => files.data,
};
