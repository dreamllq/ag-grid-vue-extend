<template>
  <div style='display: flex;width: 100px;' :style='{marginLeft:`${40*params.data.deep}px`}'>
    <div v-if='params.data.hasChildren' @click='onExpand'>
      <span
        v-if='expanded'
        class='ag-group-expanded'
        data-ref='eExpanded'
        aria-hidden='false'><span class='ag-icon ag-icon-tree-open' role='presentation' unselectable='on' /></span>
      <span
        v-else
        class='ag-group-contracted'
        data-ref='eContracted'
        aria-hidden='false'><span class='ag-icon ag-icon-tree-closed' role='presentation' unselectable='on' /></span>
    </div>
    <div>
      {{ props.params.valueFormatted || props.params.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
});

const expanded = ref(props.params.data.expanded || false);
const onExpand = async () => {
  // 更改展开状态
  const tree = props.params.getTree();
  tree.expand(props.params.data.id, !expanded.value);
  props.params.api.setGridOption('rowData', tree.flat());
};

</script>

<style lang='scss' scoped>

</style>