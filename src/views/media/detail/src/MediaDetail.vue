<template>
  <div>
    <div class="n-layout-page-header">
      <n-grid :x-gap="4">
        <n-grid-item span="9">
          <n-card :bordered="false" class="proCard" size="small" :title="mediaFileRef.title">
            <n-descriptions label-placement="top" bordered :column="3" class="py-2.5">
              <n-descriptions-item label="状态">
                <n-tag type="success"> {{ status() }}</n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="上传时间">{{
                mediaFileRef.mediaFile.createAt
              }}</n-descriptions-item>
              <n-descriptions-item v-if="mediaFileRef.mediaFile.updateAt" label="更新时间"
                >{{ mediaFileRef.mediaFile.updateAt }}
              </n-descriptions-item>
            </n-descriptions>
          </n-card>

          <n-card :bordered="false">
            <!-- bigblueass change -->
            <video ref="video" src="/videotest/test1.mp4" controls :autoplay="false">
            </video>
          </n-card>
        </n-grid-item>
        <n-grid-item span="15">
          <n-card :bordered="false" size="small" title="字幕" class="proCard">
            <n-data-table
              :columns="columns"
              :data="mediaFileRef.mediaFile.originSubtitles"
              :pagination="pagination"
            />
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MediaDetail',
  };
</script>

<script setup lang="ts">
  import { reactive, defineProps } from 'vue';
  import { getMedia } from '@/api/media/media';
  import { MediaFile } from '@/api/media/model';
  import { MediaStatus } from '@/enums/mediaStatus';
  import {columns } from './columns';
  

  const props = defineProps({
    id: String,
    searchKey: String,
  });
  const mediaFileRef = reactive<any>({
    mediaFile: MediaFile,
    title: '媒体文件详情',
    mediaUrl: '',
    subtltleUrl: '',
  });

  const status = (): string => {
    return MediaStatus.getStatusDesc(mediaFileRef.mediaFile.status);
  };

  const pagination = {
    pageSize: 10,
  };
  
  function resetMedia() {
    mediaFileRef.value = {
      mediaFile: MediaFile,
      title: '媒体文件详情',
      mediaUrl: '',
      subtltleUrl: '',
    };
  }

  async function loadMedia(id) {
    const result = await getMedia(id);
    mediaFileRef.mediaFile = result.mediaFile as MediaFile;
    mediaFileRef.title = mediaFileRef.mediaFile.title;
    // TODO 替换 url
    mediaFileRef.mediaUrl = VITE_GLOB_API_URL+'/media/' + mediaFileRef.mediaFile.fileName;
    mediaFileRef.subtltleUrl =
    VITE_GLOB_API_URL+'/srt/' + mediaFileRef.mediaFile.subtitleFileName;
    //console.log(id, 'get', result.mediaFile, mediaFileRef.mediaUrl, mediaFileRef.subtltleUrl);
  }

  if (props.id) {
    loadMedia(props.id);
  }

  //console.log('searchKey', props.searchKey, props.id);

  defineExpose({
    loadMedia,
    resetMedia,
  });
</script>

<style lang="less" scoped>
  .actions {
    width: 30%;
  }
</style>
