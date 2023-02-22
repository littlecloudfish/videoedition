<template>
    <div>{{ data }}</div>
    <n-card :bordered="false" size="small" title="Subtitle" class="proCard">
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

const actions:Array<string> = ['insert row under','delete row']

const createColumns = ({
  sendMail,
  addRow
}: {
  sendMail: (rowData : RowData) => void,
  addRow: (rowData : RowData) => void,
}): DataTableColumns => {
  return [
    {
      title: 'No.',
      key: 'index',
    },
    {
      title: 'StartTime',
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
      title: 'EndTime',
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
    title: 'Content',
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
    title: 'Correct Status',
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
    title: 'Hide Status',
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
              if (tagKey == 'insert row under'){
                addRow(row)
              }
              else if (tagKey == 'delete row'){
                sendMail(row)
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
    key: 10,
    index: 12,
    startAt: '00:12:13',
    endAt: '00:13:13',
    text: 'New York No. 1 Lake Park',
    verified:true,
    deleted: false,
    tags: ['nice', 'developer']
  },
  {
    key: 9,
    index: 32,
    startAt: '00:14:13',
    endAt: '00:15:13',
    text: 'London No. 1 Lake Park',
    verified:true,
    deleted: false,
    tags: ['wow']
  },
  {
    key: 6,
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
  delete data[data.indexOf(rowData)]

  // dialog.warning({
  //         title: 'Use Render Function',
  //         content: () => 'Content',
  //         action: (rowData) => {
  //             return h(
  //               NInput
  //             )
  //         }
  //       })
},
async addRow (rowData) {
  const arrayindex = data.indexOf(rowData)
  const adddata = reactive<RowData> (
  {
    key: 0,
    index: 0,
    startAt: '00:00:00',
    endAt: '00:00:00',
    text: 'null',
    verified:false,
    deleted: false,
    tags: []
  }
)
  data.splice(arrayindex+1,0,adddata)
}
})
const rowProps = (RowData) => {
  
return {
style: 'cursor: pointer;',
onClick: () => {
  videoeditstore.setVideoStart(RowData)
}
}
}
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
