<template>
        <n-card :bordered="false" class="proCard" size="small" :title="mediaFileRef.title">
          <n-button dashed>导出字幕</n-button>
          <n-button dashed>导出视频</n-button>
        <n-descriptions label-placement="top" bordered :column="2" class="py-2.5">
            <n-descriptions-item label="ID">{{ mediaFileRef.mediaFile.id }}</n-descriptions-item>
            <n-descriptions-item label="标题"
            >
              <input v-model="inputtitle" placeholder='上传标题' />
            </n-descriptions-item>
            <n-descriptions-item label="状态">
            <n-tag type="success">
               {{ status() }}
            </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="上传时间"
            >{{ mediaFileRef.mediaFile.createAt }}
            </n-descriptions-item>
            <n-descriptions-item v-if="mediaFileRef.mediaFile.updateAt" label="更新时间"
            >{{ mediaFileRef.mediaFile.updateAt }}
            </n-descriptions-item> 
        </n-descriptions>
        </n-card>
</template>

<script setup lang="ts">
import { reactive , ref } from 'vue';
import { MediaFile } from '@/api/media/model';
import { MediaStatus } from '@/enums/mediaStatus';

  const mediaFileRef = reactive<any>({
    mediaFile: MediaFile,
    title: '编辑媒体文件',
    mediaUrl: '',
    subtltleUrl: '',
  });

  const status = (): string => {
    return MediaStatus.getStatusDesc(mediaFileRef.mediaFile.status);
  };
  const inputtitle = ref(mediaFileRef.mediaFile.createAt)
</script>