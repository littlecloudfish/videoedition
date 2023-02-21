<template>
<div class="tag-input">
  <!-- <input v-model="newTag" type="text" @keydown.enter="addTag(newTag)" @keydown.prevent.tab="addTag(newTag)" @keydown.delete="newTag.length || removeTag(props.title.length - 1)"/> -->
  <input v-model="newTag" type="text" @keydown.enter= "handleinput()" />
  <ul class="tags">
    <li v-for="(tag, index) in props.title" :key="tag" class="tag">
    <!-- <li v-for="tag in props.title" :key="tag"  class="tag"> -->
      {{ tag }}
      <!-- <button class="delete" @click="removeTag(index)">x</button> -->
      <button class="delete" @click="$emit('removeTag',index)" >x</button>
    </li>
  </ul>
</div> 
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// const tags = ref(props.title)
// const addTag = (tag) => {
//     tags.value.push(tag);
//     newTag.value = "";
// }
// const removeTag = (index) => {
//   tags.value.splice(index, 1);
// };
// const tags = ref(props.title)
const newTag = ref('')

// const removeTag = (index) => {
//     props.title.splice(index, 1);
// };
const cleanup = ()=>{
  console.log('hi')
}
const props = defineProps({
    title: String
})
const emit = defineEmits(['addTag', 'removeTag'])
async function handleinput(){
  await(emit('addTag', newTag.value))
  newTag.value = ""
}
</script>
<style scoped>
ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
}
input {
  width: 100%;
  padding: 10px;
}
.tag {
  background: rgb(250, 104, 104);
  padding: 5px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  transition: 0.1s ease background;
}
.delete {
  color: white;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}

</style>
