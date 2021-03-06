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
    serviceName: `??????????????????????????????????????????????????????${i}`, // ????????????
    description: '??????????????????', // ??????
    callServiceNum: Math.ceil(Math.random() * 10000000000000), //??????????????????
    status: Math.floor(Math.random() * 10) % 4, // ??????
    createdBy: 'admin', // ?????????
    serviceClass: Math.floor(Math.random() * 10) % 4, // ??????
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`), // ????????????
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

for (let i = 0; i < total; i += 1) {
  appList.push({
    id: i + 1,
    appName: `??????????????????????????????????????????????????????${i}`, // ????????????
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    appName2: `??????????????????????????????????????????????????????${i}`, // ??????????????????
    description: '??????????????????', // ??????
    status: Math.floor(Math.random() * 10) % 4, // ??????
    createdBy: 'admin', // ?????????
    serviceClass: Math.floor(Math.random() * 10) % 4, // ??????
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`), // ????????????
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
    return { msg: '??????????????????' };
  }
  Object.assign(item, value);
  return { msg: 'ok' };
}
/**???????????? */
function getServiceClass() {
  return [
    { label: '????????????????????????', value: 'WAIT_BUYER_PAY', otherData: 1 },
    { label: '????????????????????????', value: 'TRADE_SUCCESS' },
    { label: '??????????????????', value: 'TRADE_FINISHED' },
    { label: '????????????', value: 'TRADE_APP' },
  ];
}
export const SERVICE = {
  '/service-list': (req: MockRequest) => genServiceData(req.queryString),
  '/app-service-list': (req: MockRequest) => genAppServiceData(req.queryString),
  '/get-dic-list': (req: MockRequest) => getServiceClass(),
  'parms/list': (req: MockRequest) => files.data,
};
