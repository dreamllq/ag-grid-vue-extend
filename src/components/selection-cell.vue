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
import type { Tree } from 'simple-tree-model';
import type { ICellRendererParams } from 'ag-grid-community';
import { ref, type PropType } from 'vue';

const props = defineProps({
  params: {
    type: Object as PropType<ICellRendererParams & {getTree: ()=> Tree, checkCallback: ()=> void}>,
    required: true
  }
});
const checked = ref(props.params.data.checked || false);
const indeterminate = ref(props.params.data.indeterminate || false);

const onInput = (e: Event) => {
  const tree = props.params.getTree();
  const target = e.target as HTMLInputElement;
  
  tree.check(props.params.data.id, !!target.checked);
  props.params.checkCallback();
  props.params.api.setGridOption('rowData', tree.flat());
};
</script>

<style scoped>

</style>