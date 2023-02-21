import { h } from 'vue';
import { Highlight } from '@/components/Highlight';
import { BasicColumn } from '@/components/Table';

export function generateColumns(key): BasicColumn[] {
  return [
    {
      title: '字幕id',
      key: 'id',
      width: 100,
    } as BasicColumn,
    {
      title: '媒体文件名',
      key: 'fileName',
      width: 100,
    } as BasicColumn,
    {
      title: '创建时间',
      key: 'createAt',
      width: 130,
    } as BasicColumn,
    {
      title: '搜索内容',
      key: 'searchValue',
      width: 330,
      render(row) {
        return h(Highlight, {
          message: row.searchValue,
          search: [key],
        });
      },
    } as BasicColumn,
    {
      title: '媒体文件ID',
      key: 'mediaFileId',
      width: 230,
    } as BasicColumn,
  ];
}
