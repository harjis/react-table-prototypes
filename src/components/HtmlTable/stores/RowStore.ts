import { makeAutoObservable } from "mobx";

import { BaseRow } from "../types";
import { CellStore } from "./CellStore";
import { ColumnTypeByName, TableStore } from "./TableStore";

type Props<Row extends BaseRow> = {
  columnTypeByName: ColumnTypeByName<Row>;
  row: Row;
  rowIndex: number;
};
export class RowStore<Row extends BaseRow, ColumnId extends keyof Row> {
  rowId: string;
  rowIndex: number;

  cells: CellStore<Row, ColumnId>[] = [];

  tableStore: TableStore<Row, ColumnId>;

  constructor(props: Props<Row>, tableStore: TableStore<Row, ColumnId>) {
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

  findCell(columnId: keyof Row): CellStore<Row, ColumnId> {
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
  ): CellStore<Row, ColumnId>[] {
    return Object.entries(row).map(([columnId, value], columnIndex) => {
      // Type cast needed cause of Object.entries() type.
      // ColumnId string comes from .entries()
      // value string comes from BaseRow
      const _columnId = columnId as ColumnId;
      const _value = value as unknown as Row[ColumnId];
      return new CellStore(
        {
          columnIndex,
          columnId: _columnId,
          rowIndex: this.rowIndex,
          rowId,
          type: columnTypeByName[_columnId],
          value: _value,
        },
        this.tableStore
      );
    });
  }
}
