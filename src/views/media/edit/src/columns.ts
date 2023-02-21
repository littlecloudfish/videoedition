import { BasicColumn } from '@/components/Table';

export const columns = [
  {
    title: 'No.',
    key: 'index',
    width: 100,
  } as BasicColumn,
  {
    title: '开始时间',
    key: 'startAt',
    width: 100,
  } as BasicColumn,
  {
    title: '结束时间',
    key: 'endAt',
    width: 100,
  } as BasicColumn,
  {
    title: '内容',
    key: 'text',
    width: 100,
  } as BasicColumn,
  {
    title: '校对状态',
    key: 'verified',
    width: 100,
  } as BasicColumn,
  {
    title: '隐藏状态',
    key: 'deleted',
    width: 100,
  } as BasicColumn,
  
];
