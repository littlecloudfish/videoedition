<template>
  <div>
    <div class="n-layout-page-header">
      <n-grid :x-gap="4">
        <n-grid-item span="15">
          <editproperty/>
        </n-grid-item>
        <n-grid-item span="9">
          <n-card :bordered="false">
            <FileVideo />
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
  <Editsubtitle/>
</template>

<script lang="ts">
  export default {
    name: 'MediaDetail',
  };
</script>

<script setup lang="ts">
  import { Editproperty } from '@/components/media/fileproperties';
  import { Editsubtitle } from '@/components/media/subtitles';
  import { FileVideo } from '@/components/media/video';
  import { reactive, defineProps } from 'vue';
  import { getMedia } from '@/api/media/media';
  import { MediaFile } from '@/api/media/model';
  

  const props = defineProps({
    id: String,
    searchKey: String,
  });

  const mediaFileRef = reactive<any>({
    mediaFile: MediaFile,
    title: '编辑媒体文件',
    mediaUrl: '',
    subtltleUrl: '',
  });


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
.adjustvideo{
  height: 250px;
}
.n-layout-page-header{
  padding-bottom: 2px;
}

</style>
