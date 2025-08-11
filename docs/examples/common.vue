<template>
  <ag-grid-vue
    :row-data='rowData'
    :column-defs='colDefs'
    :style='`height: 300px`'
    class='ag-theme-quartz'
    :row-selection='rowSelection'
  />
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'; // AG Grid Component
import type { RowSelectionOptions } from 'ag-grid-community';
import { ref } from 'vue';

const rowSelection = ref<RowSelectionOptions>({ mode: 'multiRow' });

const colDefs = ref([
  {
    field: 'name',
    width: 100,
    headerName: '人员姓名',
    sortable: false,
    valueFormatter: (params) => params.value
  }
]);

const rowData = ref([{ name: 'aaa' }, { name: 'bbb' }]);

</script>

<style scoped>

</style>