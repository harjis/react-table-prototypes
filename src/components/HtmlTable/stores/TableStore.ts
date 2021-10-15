import { makeAutoObservable } from "mobx";

import { BaseRow, ColumnType, CustomColumn } from "../types";
import { RowStore } from "./RowStore";
import { CellStore } from "./CellStore";

export type ColumnTypeByName<Row> = {
  [Key in keyof Row]: ColumnType;
};
type Props<Row extends BaseRow> = {
  columns: CustomColumn<Row>[];
  rows: Row[];
};
export class TableStore<Row extends BaseRow> {
  rows: RowStore<Row>[] = [];
  maxRowIndex: number;
  maxColumnIndex: number;

  constructor(props: Props<Row>) {
    makeAutoObservable(this);

    this.maxRowIndex = props.rows.length - 1;
    this.maxColumnIndex = props.columns.length - 1;

    this.rows = this.createRows(props.rows, props.columns);
  }

  findCell(rowId: string, columnId: keyof Row): CellStore<Row> {
    return this.findRow(rowId).findCell(columnId);
  }

  findSelectedCell(): CellStore<Row> | undefined {
    let selectedCell = undefined;
    this.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.isSelected) {
          selectedCell = cell;
        }
      });
    });

    return selectedCell;
  }

  findRow(rowId: string): RowStore<Row> {
    const row = this.rows.find((row) => row.rowId === rowId);
    if (!row) {
      throw new Error(`Row with rowId: ${rowId} was not found`);
    }

    return row;
  }

  selectCell(rowId: string, columnId: keyof Row) {
    this.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.rowId === rowId && cell.columnId === columnId) {
          cell.select();
        } else {
          cell.deselect();
        }
      });
    });
  }

  selectCellByIndex(rowIndex: number, columnIndex: number) {
    this.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (row.rowIndex === rowIndex && cell.columnIndex === columnIndex) {
          cell.select();
        } else {
          cell.deselect();
        }
      });
    });
  }

  moveSelection(direction: string) {
    const previouslySelectedCell = this.findSelectedCell();
    if (!previouslySelectedCell) return;

    if (direction === "ArrowUp") {
      const columnIndex = previouslySelectedCell.columnIndex;
      const rowIndex = Math.max(0, previouslySelectedCell.rowIndex - 1);

      this.selectCellByIndex(rowIndex, columnIndex);
    } else if (direction === "ArrowDown") {
      const columnIndex = previouslySelectedCell.columnIndex;
      const rowIndex = Math.min(
        this.maxRowIndex,
        previouslySelectedCell.rowIndex + 1
      );

      this.selectCellByIndex(rowIndex, columnIndex);
    } else if (direction === "ArrowRight") {
      const columnIndex = Math.min(
        this.maxColumnIndex,
        previouslySelectedCell.columnIndex + 1
      );
      const rowIndex = previouslySelectedCell.rowIndex;

      this.selectCellByIndex(rowIndex, columnIndex);
    } else if (direction === "ArrowLeft") {
      const columnIndex = Math.max(0, previouslySelectedCell.columnIndex - 1);
      const rowIndex = previouslySelectedCell.rowIndex;

      this.selectCellByIndex(rowIndex, columnIndex);
    }
  }

  private columnTypeByName(
    columns: CustomColumn<Row>[]
  ): ColumnTypeByName<Row> {
    return columns.reduce(
      (acc, cur) => ({ ...acc, [cur.key]: cur.type }),
      {} as ColumnTypeByName<Row> // TODO Not sure if this can be removed
    );
  }

  private createRows(
    rows: Row[],
    columns: CustomColumn<Row>[]
  ): RowStore<Row>[] {
    const columnTypeByName = this.columnTypeByName(columns);
    return rows.map(
      (row, rowIndex) => new RowStore({ columnTypeByName, row, rowIndex }, this)
    );
  }
}
