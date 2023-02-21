<template>
  <div>
    <EditMedia ref="editMediaChildRef" />
  </div>
</template>

<script setup lang="ts">
  import { EditMedia } from './index';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';

  const route = useRoute();

  const mediaDetailChildRef = ref();

  onMounted(async () => {
    mediaDetailChildRef.value?.resetMedia();
    const id = route.params.id as string;
    mediaDetailChildRef.value?.loadMedia(id);
  });
</script>

<style lang="less" scoped></style>
