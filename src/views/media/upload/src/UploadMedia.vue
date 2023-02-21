<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="媒体文件上传" v-if="showTitle">
        先填写视频主题，再上传该主题相关的媒体文件。
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            label-placement="left"
            ref="formRef"
            :model="formValue"
            :rules="rules"
          >
            <n-form-item label="标题" path="topic">
              <n-input v-model:value="formValue.title" placeholder="请输入媒体文件标题" />
            </n-form-item>
            <n-form-item label="文件" path="uploadFile">
              <n-upload
                ref="uploadFileRef"
                multiple
                :default-upload="false"
                v-model:file-list="formValue.fileList"
                @before-upload="beforeUpload"
                @change="handleUploadChange"
                :custom-request="formSubmit"
              >
                <n-button>选择音视频文件</n-button>
              </n-upload>
            </n-form-item>
            <div>
              <n-space style="margin-left: 80px">
                <n-button @click="formValidate"> 上传文件</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'UploadMedia',
    props: {
      showTitle: {
        type: Boolean,
        default: () => true,
      },
    },
  };
</script>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { FormItemRule, UploadFileInfo, UploadInst } from 'naive-ui';
  import { useMessage } from 'naive-ui';
  import { uploadMediaFile } from '@/api/media/media';
  import { useRouter } from 'vue-router';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import { PageEnum } from '@/enums/pageEnum';

  const props = defineProps(['onUploadResult']);

  const message = useMessage();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();

  const defaultValueRef = (): {
    title: string;
    fileList: UploadFileInfo[];
  } => ({
    title: '',
    fileList: [],
  });
  let formValue = reactive(defaultValueRef());
  const formRef: any = ref(null);
  const uploadFileRef = ref<UploadInst | null>(null);

  const rules = {
    title: {
      required: true,
      message: '请输入媒体文件标题',
      trigger: ['blur'],
    },
    uploadFile: {
      required: true,
      message: '请选择要上传的媒体文件',
      trigger: ['blur'],
      validator: (_: FormItemRule): boolean | Error => {
        return formValue.fileList.length > 0;
      },
    },
  };

  const beforeUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    // audio/mp4, video/mp4 audio/mpeg
    let type = data.file.file?.type;
    if (type !== 'audio/mp4' && type !== 'video/mp4' && type !== 'audio/mpeg') {
      message.error('只能上传音视频格式文件，请重新上传');
      return false;
    }
    return true;
  };

  const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
    formValue.fileList = data.fileList;
    formRef.value.validate();
  };

  const formValidate = async () => {
    formRef.value.validate((errors) => {
      if (!errors) {
        if (!errors) {
          // 这里 submit 会执行 upload 组件的 custom-request
          uploadFileRef.value?.submit();
        } else {
          message.error('验证失败，请填写完整信息');
        }
      }
    });
  };

  const formSubmit = async (_: any) => {
    const formData = new FormData();
    for (const uploadFile of formValue.fileList) {
      formData.append('uploads', uploadFile.file as File);
    }
    formData.append('title', formValue.title);
    try {
      await uploadMediaFile(formData);
      message.success('上传成功');
      if (props.onUploadResult) {
        props.onUploadResult(true);
      } else {
        await router.push({ name: PageEnum.MEDIA_LIST_NAME });
        tabsViewStore.closeCurrentTab(router.currentRoute);
      }
    } catch (e) {
      // TODO 自动上报问题
      props.onUploadResult(false);
      //console.log('upload failed', formData, e);
    }
  };
</script>

<style lang="less" scoped></style>
