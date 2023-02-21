<template>
        <n-card :bordered="false" class="proCard" size="small" :title="mediaFileRef.title">
          <n-button dashed>Import Subtitle</n-button>
          <n-button dashed>Import Video</n-button>
        <n-descriptions label-placement="top" bordered :column="2" class="py-2.5">
            <n-descriptions-item label="ID">{{ mediaFileRef.mediaFile.id }}</n-descriptions-item>
            <n-descriptions-item label="Title"
            >
              <input v-model="inputtitle" placeholder='Upload Title' />
            </n-descriptions-item>
            <n-descriptions-item label="Status">
            <n-tag type="success">
               {{ status() }}
            </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="UploadTime"
            >{{ mediaFileRef.mediaFile.createAt }}
            </n-descriptions-item>
            <n-descriptions-item v-if="mediaFileRef.mediaFile.updateAt" label="Updated Time"
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
    title: 'EditMediafile',
    mediaUrl: '',
    subtltleUrl: '',
  });

  const status = (): string => {
    return MediaStatus.getStatusDesc(mediaFileRef.mediaFile.status);
  };
  const inputtitle = ref(mediaFileRef.mediaFile.createAt)
</script>