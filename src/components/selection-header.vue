<template>
  <div
    class='ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper'
    :class="{
      'ag-checked': checked, 
      'ag-indeterminate': !checked && indeterminate
    }"
    data-ref='eWrapper'
    role='presentation'> 
    <input
      id='ag-128-input'
      class='ag-input-field-input ag-checkbox-input'
      data-ref='eInput'
      type='checkbox'
      tabindex='-1'
      :checked='checked'
      @input='onInput'> 
  </div>
</template>

<script setup lang="ts">
import type { ToJSONType, Tree } from 'simple-tree-model';
import type { IHeaderParams, AgEventListener } from 'ag-grid-community';
import { onBeforeUnmount, ref, type PropType } from 'vue';

const props = defineProps({
  params: {
    type: Object as PropType<IHeaderParams & {
      getTree: ()=> Tree, 
      checkCallback: ()=> void
    }>,
    required: true
  }
});

const checked = ref(false);
const indeterminate = ref(false);

const onRowDataUpdated: AgEventListener<any, any, 'rowDataUpdated'> = (e) => {
  const data = e.api.getGridOption('rowData') as ToJSONType[];
  checked.value = data.every(item => item.checked);
  indeterminate.value = checked.value === false && data.some(item => item.checked);
};

props.params.api.addEventListener('rowDataUpdated', onRowDataUpdated);

onBeforeUnmount(() => {
  props.params.api.removeEventListener('rowDataUpdated', onRowDataUpdated);
});

const onInput = (e: Event) => {
  const tree = props.params.getTree();
  const target = e.target as HTMLInputElement;
  tree.root.forEach(node => tree.check(node.id, !!target.checked));
  props.params.checkCallback();
  props.params.api.setGridOption('rowData', tree.flat());
};
</script>