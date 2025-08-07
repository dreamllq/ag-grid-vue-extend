import { Tree, type TreeDataItem } from 'simple-tree-model';
import SelectionCell from './components/selection-cell.vue';
import SelectionHeader from './components/selection-header.vue';
import GroupCell from './components/group-cell.vue';
import EventEmitter from 'eventemitter3';

export const useAgGridExtend = () => { 
  const ee = new EventEmitter<'selection-change'>();

  const bus = {
    emit: ee.emit.bind(ee),
    on: ee.on.bind(ee),
    off: ee.off.bind(ee)
  };

  let tree: Tree | undefined = undefined;
  let selectionRows: TreeDataItem[] = [];
  let currentDataSelectionRows : TreeDataItem[] = [];

  const onSelectionChange = () => {
    currentDataSelectionRows = tree!.getCheckedNodes().map(item => item.toJSON());
    bus.emit('selection-change');
  };

  const init = (data: TreeDataItem[]) => {
    if (tree) {
      selectionRows = [...selectionRows, ...currentDataSelectionRows];
    }
    
    tree = new Tree(data);
    
    selectionRows.forEach(row => {
      tree!.check(row.id, true);
    });
  };

  const checkColumn = {
    field: '_checkFlag',
    cellRenderer: SelectionCell,
    cellRendererParams: {
      getTree: () => tree,
      checkCallback: onSelectionChange
    },
    headerComponent: SelectionHeader,
    headerComponentParams: {
      getTree: () => tree,
      checkCallback: onSelectionChange
    }
  };

  const expandColumn = {
    field: '_expandFlag',
    cellRenderer: GroupCell,
    cellRendererParams: { getTree: () => tree }
  };

  const flat = () => tree?.flat() || [];

  const getSelectedRows = () => [...selectionRows, ...currentDataSelectionRows];

  const clearSelectionRows = () => {
    selectionRows = [];
  };

  return {
    bus,
    init,
    checkColumn,
    expandColumn,
    flat,
    getSelectedRows,
    clearSelectionRows
  };
};