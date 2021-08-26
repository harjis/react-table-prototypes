import React, { useCallback, useMemo } from "react";
import { Column, useTable } from "react-table";

import css from "./HtmlTable.module.css";

import { CustomColumn, OnCellChange } from "../../types";
import { customColumnsToReactTableColumns } from "../../utils/columnUtils";
import { ColumnHeaders } from "../ColumnHeaders/ColumnHeaders";
import { TableBody } from "../TableBody/TableBody";
import {
  SelectedCellProvider,
  useSelectedCellContext,
} from "../../context/selectedCellContext";

export type Props<Row extends Record<string, unknown>> = {
  columns: CustomColumn<Row>[];
  data: Row[];
  onCellChange: OnCellChange<Row>;
  width?: string;
};

export const HtmlTable = <Row extends Record<string, unknown>>(
  props: Props<Row>
) => {
  const columns = useMemo(
    () => props.columns.map(customColumnsToReactTableColumns),
    [props.columns]
  );
  const data = useMemo(() => props.data, [props.data]);

  return (
    <SelectedCellProvider
      maxColumnIndex={columns.length - 1}
      maxRowIndex={data.length - 1}
    >
      <InternalHtmlTable
        {...props}
        columns={columns}
        data={data}
        originalColumns={props.columns}
      />
    </SelectedCellProvider>
  );
};

type InternalHtmlTableProps<Row extends Record<string, unknown>> = {
  columns: Column<Row>[];
  data: Row[];
  originalColumns: CustomColumn<Row>[];
  onCellChange: OnCellChange<Row>;
  width?: string;
};
export const InternalHtmlTable = <Row extends Record<string, unknown>>(
  props: InternalHtmlTableProps<Row>
): JSX.Element => {
  const tableInstance = useTable({
    columns: props.columns,
    data: props.data,
    originalColumns: props.originalColumns,
    onCellChange: props.onCellChange,
  });

  const { moveSelection } = useSelectedCellContext();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.key)
      ) {
        event.preventDefault();
        event.stopPropagation();
        moveSelection(event.key);
      }
    },
    [moveSelection]
  );

  const style: { width?: string } = {};
  if (props.width) {
    style["width"] = props.width;
  }
  return (
    <table
      {...tableInstance.getTableProps()}
      className={css.Container}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={style}
    >
      <ColumnHeaders tableInstance={tableInstance} />
      <TableBody tableInstance={tableInstance} />
    </table>
  );
};
