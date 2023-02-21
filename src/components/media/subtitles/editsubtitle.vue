<template>
    <!-- <div>{{ data }}</div> -->
    <n-card :bordered="false" size="small" title="字幕" class="proCard">
      <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-props="rowProps"
    />
    </n-card>
    
</template>

<script lang="ts" setup>
import { h, reactive } from 'vue'
import { NSwitch, NButton, useMessage,NInput, NTimePicker, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useVideoEditStore } from '@/store/modules/editvideo';

type RowData = {
  key: number
  index: number
  startAt: string
  endAt: string
  text: string
  verified:boolean
  deleted:boolean
  tags: string[]
}
const videoeditstore = useVideoEditStore();

const actions:Array<string> = ['insert row','next','addtag']

const createColumns = ({
  sendMail,
  addTag
}: {
  sendMail: (rowData : RowData) => void,
  addTag: (rowData : RowData) => void,
}): DataTableColumns => {
  return [
    {
      title: 'No.',
      key: 'index',
    },
    {
      title: '开始时间',
      key: 'startAt',
      render(row){
        return h(
          NTimePicker,
        {   
          'on-confirm' : (v:number,formattedValue: string)=>{
              row.startAt=formattedValue
            },
          'default-formatted-value' : row.startAt
        })}
    },
    {
      title: '结束时间',
      key: 'endAt',
      render(row){
        return h(
          NTimePicker,
        {   
          'on-confirm' : (v:number,formattedValue: string)=>{
              row.endAt=formattedValue
            },
          'default-formatted-value' : row.endAt
        })}
    },
    {
    title: '内容',
    key: 'text',
    width: 300,
    render(row){
        return h(
        NInput,
        {   
            'default-value': row.text,
            'on-change': (v:string)=>{
                row.text=v
            },
            type:"text", 
            placeholder: row.text
        })}
    },
    {
    title: '校对状态',
    key: 'verified',
    width: 100,
    render(row){
        return h(
        NSwitch,
        {   
            'default-value': row.verified,
            'on-update:value': ()=>{
              row.verified = !row.verified
            },
        })}
    },
    {
    title: '隐藏状态',
    key: 'deleted',
    width: 100,
    render(row){
        return h(
          NSwitch,
        {   
            'default-value': row.deleted,
            'on-update:value': ()=>{
              row.deleted= !row.deleted
            },
        })}
    },
    {
      title: 'Tags',
      key: 'tags',
      
      render (row) {
        return h(
          Dialoginput,
          {
            'title' : row.tags,
            'onAddTag' : (value)=>{
              row.tags.push(value)
              // value = ''
            },
            'onRemoveTag' : (value) =>{
              row.tags.splice(value,1)
            }
          }
        )
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        const aaction = actions.map((tagKey) => {
          return h(
            NButton,
            {
              size: 'small',
             onClick: () => {
              if (tagKey == 'addtag'){
                addTag(row)
              }
              else if (tagKey == 'next'){
                sendMail(row)
              }
              else if (tagKey == 'insert row'){

              }

              }
            },
            {
              default: () => tagKey
            }
          )
        })
        return aaction
      }
      
    }
  ]
}

  const data = reactive<RowData[]>([
  {
    key: 0,
    index: 12,
    startAt: '00:12:13',
    endAt: '00:13:13',
    text: 'New York No. 1 Lake Park',
    verified:true,
    deleted: false,
    tags: ['nice', 'developer']
  },
  {
    key: 2,
    index: 32,
    startAt: '00:14:13',
    endAt: '00:15:13',
    text: 'London No. 1 Lake Park',
    verified:true,
    deleted: false,
    tags: ['wow']
  },
  {
    key: 66,
    index: 12,
    startAt: '00:16:13',
    endAt: '00:17:13',
    text: 'Shanghai No. 1 Lake Park',
    verified:true,
    deleted: false,
    tags: ['cool', 'teacher']
  }
])



const message = useMessage()
const dialog = useDialog()
const columns = createColumns({
sendMail (rowData) {
  dialog.warning({
          title: 'Use Render Function',
          content: () => 'Content',
          action: (rowData) => {
              return h(
                NInput
              )
          }
        })
},
addTag (rowData) {
  dialog.warning({
          title: 'Use Render Function',
          content: () => 'Content',
          action: () => 'Action'
        })
}
})
const rowProps = (RowData) => {
  
return {
style: 'cursor: pointer;',
onClick: () => {
  videoeditstore.setVideoStart(RowData)
}
}
}//use it to jump to present time in video 
const pagination = {pageSize: 10,};
</script>

<script lang="ts">
import Dialoginput  from './dialoginput.vue'

export default{
  name: 'dialoginputview',
  components: {
   Dialoginput
  }
}

</script>
