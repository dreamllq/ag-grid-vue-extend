<template>
  <ag-grid-vue
    :row-data='rowData'
    :column-defs='colDefs'
    :style='`height: 600px`'
    class='ag-theme-quartz'
    :get-row-id='(params) => String(params.data.id)'
  />
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'; // AG Grid Component
import type { ColDef } from 'ag-grid-community';
import { ref } from 'vue';
import { useAgGridExtend } from 'ag-grid-vue-extend';

const {
  init, expandColumn, checkColumn, flat, getSelectedRows 
} = useAgGridExtend({
  onSelectionChange: () => {
    const rows = getSelectedRows();
    console.log(rows);
  }
});

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

const colDefs = ref<ColDef[]>([
  {
    sortable: false,
    width: 50,
    ...checkColumn,
    field: '_checkFlag'
  },
  {
    headerName: '人员姓名',
    sortable: false,
    width: 250,
    valueFormatter: params => params.data.name,
    ...expandColumn
  },
  {
    field: '_checkFlag',
    headerName: '_checkFlag',
    sortable: false,
    width: 250
  },
  {
    field: '_expandFlag',
    headerName: '_expandFlag',
    sortable: false,
    width: 250
  }
]);

const rowData = ref(flat());

</script>

<style scoped>

</style>