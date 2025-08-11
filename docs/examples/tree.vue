<template>
  <ag-grid-vue
    :row-data='rowData'
    :column-defs='colDefs'
    :style='`height: 300px`'
    class='ag-theme-quartz'
    :get-row-id='(params) => String(params.data.id)'
  />
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'; // AG Grid Component
import { ref } from 'vue';
import { useAgGridExtend } from 'ag-grid-vue-extend';

const { init, expandColumn, flat } = useAgGridExtend();

init([
  {
    id: 'aaa',
    name: '张三',
    children: [
      {
        id: 'aaa1',
        name: '张三1'
      },
      {
        id: 'aaa2',
        name: '张三2',
        children: [
          {
            id: 'aaa21',
            name: '张三21'
          },
          {
            id: 'aaa22',
            name: '张三22'
          }
        ]
      }
    ]
  },
  {
    id: 'bbb',
    name: '李四',
    children: [
      {
        id: 'bbb1',
        name: '张三1'
      }
    ]
  }
]);

const colDefs = ref([
  {
    headerName: '人员姓名',
    sortable: false,
    width: 250,
    valueFormatter: params => params.data.name,
    ...expandColumn
  }
]);

const rowData = ref(flat());

</script>

<style scoped>

</style>