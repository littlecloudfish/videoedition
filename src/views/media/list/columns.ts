import { NTag } from 'naive-ui';
import { h } from 'vue';
import { MediaStatus } from '@/enums/mediaStatus';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  } as BasicColumn,
  {
    title: '标题',
    key: 'title',
    width: 200,
  } as BasicColumn,
  {
    title: '文件名',
    key: 'fileName',
    width: 100,
  } as BasicColumn,
  {
    title: '创建时间',
    key: 'createAt',
    width: 130,
  } as BasicColumn,
  {
    title: '更新时间',
    key: 'updateAt',
    width: 130,
  } as BasicColumn,
  {
    title: '状态',
    key: 'status',
    width: 130,
    render(row) {
      return h(
        NTag,
        {
          type: 'success',
        },
        {
          default: () => {
            return MediaStatus.getStatusDesc(row.status as number);
          },
        }
      );
    },
  } as BasicColumn,
];
