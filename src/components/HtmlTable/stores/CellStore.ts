import { makeAutoObservable } from "mobx";

import { BaseRow, ColumnType } from "../types";
import { TableStore } from "./TableStore";

type Props<Row extends BaseRow> = {
  columnIndex: number;
  columnId: keyof Row;
  rowIndex: number;
  rowId: string;
  type: ColumnType;
  value: unknown;
};
export class CellStore<Row extends BaseRow> {
  columnIndex: number;
  columnId: keyof Row;
  rowIndex: number;
  rowId: string;
  type: ColumnType;
  value: unknown;

  isSelected: boolean = false;

  tableStore: TableStore<Row>;

  constructor(props: Props<Row>, tableStore: TableStore<Row>) {
    makeAutoObservable(this);

    this.columnIndex = props.columnIndex;
    this.columnId = props.columnId;
    this.rowIndex = props.rowIndex;
    this.rowId = props.rowId;
    this.value = props.value;
    this.type = props.type;
    this.tableStore = tableStore;
  }

  updateValue(newValue: unknown) {
    this.value = newValue;
  }

  // This function delegates selection to tableStore because table store has a reference
  // to all cells and only there we can deselect all the other cells
  toggleSelection() {
    this.tableStore.selectCell(this.rowId, this.columnId);
  }

  deselect() {
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
  }
}
