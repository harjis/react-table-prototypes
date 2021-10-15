import React, { useCallback } from "react";

import css from "./HtmlTable.module.css";

import { BaseRow, CustomColumn, OnCellChange } from "../../types";
import { ColumnHeaders } from "../ColumnHeaders/ColumnHeaders";
import { TableBody } from "../TableBody/TableBody";
import { useTableStore } from "../../hooks/useTableStore";

export type Props<Row extends BaseRow> = {
  columns: CustomColumn<Row>[];
  rows: Row[];
  onCellChange: OnCellChange<Row>;
  width?: string;
};

export const HtmlTable = <Row extends BaseRow>(props: Props<Row>) => {
  const tableStore = useTableStore({
    rows: props.rows,
    columns: props.columns,
  });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.key)
      ) {
        event.preventDefault();
        event.stopPropagation();
        tableStore.moveSelection(event.key);
      }
    },
    [tableStore]
  );

  const style: { width?: string } = {};
  if (props.width) {
    style["width"] = props.width;
  }
  return (
    <table
      role="table"
      className={css.Container}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={style}
    >
      <ColumnHeaders columns={props.columns} />
      <TableBody tableStore={tableStore} />
    </table>
  );
};
