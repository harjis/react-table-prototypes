import { makeAutoObservable } from "mobx";

import { BaseRow } from "../types";
import { CellStore } from "./CellStore";
import { ColumnTypeByName, TableStore } from "./TableStore";

type Props<Row extends BaseRow> = {
  columnTypeByName: ColumnTypeByName<Row>;
  row: Row;
  rowIndex: number;
};
export class RowStore<Row extends BaseRow> {
  rowId: string;
  rowIndex: number;

  cells: CellStore<Row>[] = [];

  tableStore: TableStore<Row>;

  constructor(props: Props<Row>, tableStore: TableStore<Row>) {
    makeAutoObservable(this, { tableStore: false });
    this.tableStore = tableStore;

    this.rowId = props.row.id;
    this.rowIndex = props.rowIndex;
    this.cells = this.createCells(
      props.row,
      this.rowId,
      props.columnTypeByName
    );
  }

  findCell(columnId: keyof Row): CellStore<Row> {
    const cell = this.cells.find((cell) => cell.columnId === columnId);
    if (!cell) {
      throw new Error(`Column with columnId: ${columnId} was not found`);
    }

    return cell;
  }

  private createCells(
    row: Row,
    rowId: string,
    columnTypeByName: ColumnTypeByName<Row>
  ): CellStore<Row>[] {
    return Object.entries(row).map(([columnId, value], columnIndex) => {
      // Type cast needed cause of Object.entries() type
      const _columnId = columnId as keyof Row;
      return new CellStore(
        {
          columnIndex,
          columnId: _columnId,
          rowIndex: this.rowIndex,
          rowId,
          type: columnTypeByName[_columnId],
          value,
        },
        this.tableStore
      );
    });
  }
}
