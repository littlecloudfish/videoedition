<template>
    <video 
    ref="video" 
    :src="mediaFileRef.mediaUrl" controls 
    :autoplay="false" 
    class="adjustvideo">
    </video>

</template>

<script lang="ts" setup>
import { reactive,ref, watch} from 'vue';
import { MediaFile } from '@/api/media/model';
import { useVideoEditStore } from '@/store/modules/editvideo';

const videoeditstore = useVideoEditStore();

const video = ref(null) 

watch(()=>videoeditstore.getVideoTime, function(){
    video.value.currentTime=videoeditstore.getVideoTime
})


const mediaFileRef = reactive<any>({
    mediaFile: MediaFile,
    title: '编辑媒体文件',
    mediaUrl: '/videotest/test1.mp4',
    subtltleUrl: '',
  });

</script>
