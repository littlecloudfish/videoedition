<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm
      :showAdvancedButton="false"
      @register="register"
      @submit="handleSubmit"
      @reset="handleReset"
    >
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :hideToolTip="true"
      :columns="makeColumns()"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    />

    <n-drawer v-model:show="showMediaDetail" :width="'95%'" :on-after-leave="afterDrawerLeave">
      <n-drawer-content title="媒体文件详情" closable>
        <MediaDetail
          ref="mediaDetailChildRef"
          v-show="showMediaDetail"
          :id="mediaDetailIdRef"
          :searchKey="searchKeyRef"
        />
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { Edit as EditIcon } from '@vicons/carbon';
  import { useMessage } from 'naive-ui';
  import { BasicColumn, BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { searchMedia } from '@/api/media/media';
  import { generateColumns } from './columns';
  import { MediaDetail } from '../detail/index';

  const schemas: FormSchema[] = [
    {
      field: 'key',
      component: 'NInput',
      label: '搜索内容',
      componentProps: {
        placeholder: '请输入搜索内容',
        showButton: false,
        onInput: (e: any) => {
          //console.log('search key', e);
        },
      },
    },
  ];

  const message = useMessage();
  const actionRef = ref();
  const showMediaDetail = ref(false);
  const mediaDetailIdRef = ref<String | undefined>();
  const searchKeyRef = ref<String | undefined>('毛毛');

  // {key:""}
  const queryParams = ref({});

  const showMediaDetailView = (id) => {
    mediaDetailIdRef.value = id;
    searchKeyRef.value = (queryParams.value as any).key;
    showMediaDetail.value = true;
  };

  const afterDrawerLeave = () => {
    mediaDetailIdRef.value = undefined;
  };

  // TODO 搜索
  const actionColumn = reactive({
    width: 400,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '查看',
            icon: EditIcon,
            onClick: handleViewMedia.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['media_list'],
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  const loadDataTable = async (res) => {
    if ((queryParams.value as any).key) {
      //console.log('loadDataTable', 'queryParams:', queryParams.value, 'res:', res);
      return await searchMedia({ ...queryParams.value, ...res });
    } else {
      // 搜索 key 为空，返回默认空数据
      return {
        page: 0,
        pageSize: 0,
        list: [],
        pageCount: 0,
      };
    }
  };

  const makeColumns = (): BasicColumn[] => {
    return generateColumns((queryParams.value as any).key);
  };

  function onCheckedRow(rowKeys) {
    //console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function handleViewMedia(record: Recordable) {
    // router.push({ name: PageEnum.MEDIAD_DETAIL_NAME, params: { id: record.mediaFileId } });
    showMediaDetailView(record.mediaFileId);
  }

  function handleSubmit(values: Recordable) {
    queryParams.value = values;
    if ((queryParams.value as any).key) {
      //console.log('handleSubmit', values, queryParams.value);
      reloadTable();
    } else {
      message.warning('请输入搜索内容');
    }
  }

  function handleReset(_: Recordable) {
    queryParams.value = {};
  }
</script>

<style lang="less" scoped></style>
