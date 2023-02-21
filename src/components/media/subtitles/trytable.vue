<template>
<div>{{ createData[0].text }}</div>
<n-input v-model:value="createData[0].text" type="text" placeholder="Basic Input" />
<n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
/>
</template>
<script lang="ts" setup>
import { h,reactive } from 'vue'
import { NButton, useMessage, DataTableColumns, NInput } from 'naive-ui'

const updatemodelValue = (s) =>{
    createData[0].text = s
}

type RowData = {
  key: number
  index: number
  startAt: string
  endAt: string
  text: string
  verified:string
  deleted:string
  tags: string[]
}

// const createData = (): RowData[]=>reactive([
const createData = reactive<RowData[]>([
  {
    key: 0,
    index: 12,
    startAt: 'sdf',
    endAt: 'sdfsd',
    text: 'New York No. 1 Lake Park',
    verified:'fdsfsd',
    deleted: 'sdfd',
    tags: ['nice', 'developer']
  },
  {
    key: 2,
    index: 32,
    startAt: 'sdf',
    endAt: 'sdfsd',
    text: 'London No. 1 Lake Park',
    verified:'fdsfsd',
    deleted: 'sdfd',
    tags: ['wow']
  },
  {
    key: 66,
    index: 12,
    startAt: 'sdf',
    endAt: 'sdfsd',
    text: 'Shanghai No. 1 Lake Park',
    verified:'fdsfsd',
    deleted: 'sdfd',
    tags: ['cool', 'teacher']
  }
])

const createColumns = ({
play
}: {
play: (row ) => void
}): DataTableColumns => {
return [

    {
    title: 'No',
    key: 'no'
    },
    {
    title: 'Title',
    key: 'title',

    },
    {
    title: 'Length',
    key: 'length'
    },
    {
    title:'input',
    key:'tryinput',
    
    render(){
        // const props = defineProps(
        //     {'modelValue' : String})
       
        return h(
        NInput,
        {   
            // wherevalue:
            // value: 'wherevalue.value',
            'default-value': createData[0].text,
            'on-change': (v:string)=>{
                updatemodelValue(v)
            },
            type:"text", 
            placeholder: createData[0].text
        })
        
        }
    },
    {
    title: 'Action',
    key: 'actions',
    render (row) {
        return h(
        NButton,
        {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row)
        },
        { default: () => 'Play' }
        )
    }
    }
]
}

const data = [
{ no: 3, title: 'Wonderwall', length: '4:18' },
{ no: 4, title: "Don't Look Back in Anger", length: '4:48' },
{ no: 12, title: 'Champagne Supernova', length: '7:27' }
]


const message = useMessage()


const columns = createColumns({
play (row) {
message.info(`Play ${row.title}`)
}
})

const pagination = {
pageSize: 10,
};

</script>