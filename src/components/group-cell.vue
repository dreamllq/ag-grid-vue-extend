<template>
  <div style='display: flex;width: 100px;' :style='{marginLeft:`${40*params.data!.deep}px`}' class='extend--group-cell'>
    <div v-if='hasChildren'>
      <span
        v-if='loading'
        class='ag-group-contracted'>
        <span class='ag-icon ag-icon-loading' role='presentation' unselectable='on' />
      </span>
      <span
        v-else-if='params.data!.expanded === true'
        class='ag-group-expanded'
        data-ref='eExpanded'
        aria-hidden='false'>
        <span
          class='ag-icon ag-icon-tree-open'
          role='presentation'
          unselectable='on'
          @click='onExpand(false)' />
      </span>
      <span
        v-else
        class='ag-group-contracted'
        data-ref='eContracted'
        aria-hidden='false'>
        <span
          class='ag-icon ag-icon-tree-closed'
          role='presentation'
          unselectable='on' 
          @click='onExpand(true)' />
      </span>
    </div>
    <div>
      {{ props.params.valueFormatted || props.params.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToJSONType, Tree, TreeDataItem } from 'simple-tree-model';
import type { ICellRendererParams } from 'ag-grid-community';
import { PropType, ref } from 'vue';

const props = defineProps({
  params: {
    type: Object as PropType<ICellRendererParams<ToJSONType> & {
      getTree: ()=> Tree, 
      loadData?: () => Promise<TreeDataItem[]>
    }>,
    required: true
  }
});
const loading = ref(false);
const hasLoadDateHasChildren = ref(props.params.loadData && !props.params.data!.childrenIsArray);
const hasChildren = ref(props.params.data!.hasChildren || hasLoadDateHasChildren.value);

const onExpand = async (expanded: boolean) => {
  if (loading.value) return;
  // 更改展开状态
  const tree = props.params.getTree();
  tree.expand(props.params.data!.id, expanded);
  const node = tree.getById(props.params.data!.id)!;
  node.children = node.children || [];

  if (hasLoadDateHasChildren.value) {
    try {
      loading.value = true;

      const children = await props.params.loadData!();
      children.forEach(child => {
        tree.add(props.params.data!.id, child);
      });
    } finally {
      loading.value = false;
    }
  }

  props.params.api.setGridOption('rowData', tree.flat());
};

</script>