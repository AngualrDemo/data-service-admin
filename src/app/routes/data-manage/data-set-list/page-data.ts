import { STColumn } from '@delon/abc/st';

/**
 * 数据集列表配置数据
 */
export const DATA_SET_LIST_DATA: STColumn[] = [
  { title: '编号', index: 'no' },
  { title: '调用次数', type: 'number', index: 'callNo' },
  { title: '头像', type: 'img', width: '50px', index: 'avatar' },
  { title: '时间', type: 'date', index: 'updatedAt' },
];
