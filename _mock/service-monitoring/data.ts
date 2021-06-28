const list: any[] = [];
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
export function getServiceMonitoringList(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter((data) => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}
