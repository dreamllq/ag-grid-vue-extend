import { Tree, type TreeDataItem } from 'simple-tree-model';
import SelectionCell from './components/selection-cell.vue';
import SelectionHeader from './components/selection-header.vue';
import GroupCell from './components/group-cell.vue';

export type AgGridExtendOptions = {
  loadData?: () => Promise<TreeDataItem[]>;
  onSelectionChange?: ()=> void;
}

export const useAgGridExtend = (options:AgGridExtendOptions = {}) => { 
  let tree: Tree | undefined = undefined;
  let selectionRows: TreeDataItem[] = [];
  let currentDataSelectionRows : TreeDataItem[] = [];

  const onSelectionChange = () => {
    currentDataSelectionRows = tree!.getCheckedNodes().map(item => item.toJSON());
    
    if (options.onSelectionChange) {
      options.onSelectionChange();
    }
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
    cellRendererParams: {
      getTree: () => tree,
      loadData: options.loadData 
    }
  };

  const flat = () => tree?.flat() || [];

  const getSelectedRows = () => [...selectionRows, ...currentDataSelectionRows];

  const clearSelectionRows = () => {
    selectionRows = [];
  };

  return {
    init,
    checkColumn,
    expandColumn,
    flat,
    getSelectedRows,
    clearSelectionRows
  };
};