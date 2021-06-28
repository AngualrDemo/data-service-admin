import { MockRequest } from '@delon/mock';
import { getServiceMonitoringList } from './data';
export const SERVICE_MONITORING = {
  '/service-monitoring-list': (req: MockRequest) => getServiceMonitoringList(req.queryString),
};
