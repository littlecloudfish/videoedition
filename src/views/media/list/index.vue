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
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="baseTableRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="showUploadNewMediaView"> UploadMedia </n-button>
      </template>
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">Refresh Data</n-button>
      </template>
    </BasicTable>

    <n-drawer v-model:show="showUploadMedia" :placement="'top'" :height="'40%'">
      <n-drawer-content title="媒体文件上传" closable>
        <UploadMedia v-if="showUploadMedia" :onUploadResult="onUploadResult" :showTitle="false" />
      </n-drawer-content>
    </n-drawer>

    <n-drawer
      v-model:show="showMediaDetail"
      :width="'95%'"
      :on-after-leave="afterDetailDrawerLeave"
    >
      <n-drawer-content title="媒体文件详情" closable>
        <MediaDetail ref="mediaDetailChildRef" v-show="showMediaDetail" :id="mediaDetailIdRef" />
      </n-drawer-content>
    </n-drawer>

    <n-drawer v-model:show="showEditMedia" :width="'95%'" :on-after-leave="afterEditDrawerLeave">
      <n-drawer-content title="编辑媒体文件" closable>
        <EditMedia ref="editMediaChildRef" v-show="showEditMedia" :id="editMediaIdRef" />
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref, Component } from 'vue';
  import {
    Delete as DeleteIcon,
    Translate,
    FolderDetailsReference,
    ListChecked,
  } from '@vicons/carbon';
  import { CutOutline } from '@vicons/ionicons5';
  import { useDialog, useMessage, NIcon } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { getMediaList, delMedia } from '@/api/media/media';
  import { columns } from './columns';
  import { MediaStatus } from '@/enums/mediaStatus';
  import { UploadMedia } from '../upload/index';
  import { MediaDetail } from '../detail/index';
  import { EditMedia } from '../edit/index';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'NInput',
      label: '搜索标题',
      componentProps: {
        placeholder: '请输入搜索标题',
        showButton: false,
        onInput: (e: any) => {
          //console.log('title', e);
        },
      },
    },
    {
      field: 'status',
      component: 'NSelect',
      label: '状态',
      componentProps: {
        placeholder: '请选择状态',
        clearable: true,
        options: [
          {
            label: MediaStatus.ProcessMakeSubtitles.desc,
            value: MediaStatus.ProcessMakeSubtitles.status,
          },
          {
            label: MediaStatus.ProcessMakeSubtitlesSuccess.desc,
            value: MediaStatus.ProcessMakeSubtitlesSuccess.status,
          },
        ],
        onUpdateValue: (e: any) => {
          //console.log('status', e);
        },
      },
    },
    {
      field: 'publishDate',
      component: 'NDatePicker',
      label: '发布时间',
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          //console.log('publishDate', e);
        },
      },
    },
  ];

  const message = useMessage();
  const dialog = useDialog();
  const baseTableRef = ref();
  const mediaDetailChildRef = ref();
  const editMediaChildRef = ref();

  const showUploadMedia = ref(false);
  const showMediaDetail = ref(false);
  const showEditMedia = ref(false);
  const mediaDetailIdRef = ref(undefined);
  const editMediaIdRef = ref(undefined);
  // {title,status,publishDate}
  const queryParams = ref({});

  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };
  // TODO 搜索
  const actionColumn = reactive({
    width: 130,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '查看',
            key: 'view',
            icon: renderIcon(FolderDetailsReference),
            onClick: handleDetail.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['media_list'],
          },
        ],
        dropDownActions: [
          {
            label: '剪辑',
            key: 'edit',
            icon: renderIcon(CutOutline),
            onClick: handleEdit.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['media_list_edit'],
          },
          {
            label: '校对',
            key: 'check',
            icon: renderIcon(ListChecked),
            onClick: handleEdit.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['media_list_check'],
          },
          {
            label: '翻译',
            key: 'translate',
            icon: renderIcon(Translate),
            onClick: handleTranslate.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['media_list_translate'],
          },
          {
            label: '删除',
            key: 'delete',
            icon: renderIcon(DeleteIcon),
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['media_list_delete'],
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

  const onUploadResult = (success: boolean) => {
    if (success) {
      showUploadMedia.value = false;
    }
  };

  const showUploadNewMediaView = () => {
    showUploadMedia.value = true;
  };

  const showMediaDetailView = (id) => {
    mediaDetailIdRef.value = id;
    showMediaDetail.value = true;
  };
  const afterDetailDrawerLeave = () => {
    mediaDetailIdRef.value = undefined;
  };

  const showEditMediaView = (id) => {
    editMediaIdRef.value = id;
    showEditMedia.value = true;
  };
  const afterEditDrawerLeave = () => {
    editMediaIdRef.value = undefined;
  };

  const loadDataTable = async (res) => {
    //console.log('loadDataTable', 'queryParams:', queryParams.value, 'res:', res);
    return await getMediaList({ ...queryParams.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    //console.log(rowKeys);
  }

  function reloadTable() {
    baseTableRef.value.reload();
  }

  // import { useRouter } from 'vue-router';
  // import { PageEnum } from '@/enums/pageEnum';
  // const router = useRouter();
  function handleDetail(record: Recordable) {
    //console.log('点击了查看', record.id);
    // router.push({ name: PageEnum.MEDIAD_DETAIL_NAME, params: { id: record.id } });
    showMediaDetailView(record.id);
  }

  function handleEdit(record: Recordable) {
    //console.log('点击了编辑', record.id);
    // router.push({ name: PageEnum.MEDIAD_DETAIL_NAME, params: { id: record.id } });
    showEditMediaView(record.id);
  }

  function handleTranslate(record: Recordable) {
    //console.log('点击了翻译', record.id);
    // router.push({ name: PageEnum.MEDIAD_DETAIL_NAME, params: { id: record.id } });
    showMediaDetailView(record.id);
  }

  function handleDelete(record: Recordable) {
    dialog.warning({
      title: '提示',
      content: '你确定要删除吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        try {
          const result = await delMedia(record.id);
          // TODO 解析结果，云端校验用户权限
          //console.log('result', result);
          message.success('删除成功');
          setTimeout(() => {
            reloadTable();
          });
        } catch (e) {
          //console.log('handleDelete error', e);
          message.success('删除失败');
        }
      },
      onNegativeClick: () => {},
    });
  }

  function handleSubmit(values: Recordable) {
    queryParams.value = values;
    //console.log('handleSubmit', values, queryParams.value);
    reloadTable();
  }

  function handleReset(_: Recordable) {
    queryParams.value = {};
  }
</script>

<style lang="less" scoped></style>
