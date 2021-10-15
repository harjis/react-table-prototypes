import React from "react";

import s from "./ColumnHeaders.module.css";
import { ColumnHeader } from "./ColumnHeader";
import { BaseRow, CustomColumn } from "../../types";

type Props<Row extends BaseRow> = {
  columns: CustomColumn<Row>[];
};
export const ColumnHeaders = <Row extends BaseRow>(
  props: Props<Row>
): JSX.Element => {
  return (
    <thead className={s.stickyColumnHeaders}>
      <tr role="row">
        {props.columns.map((column, columnIndex) => {
          return (
            <ColumnHeader
              key={String(column.key)}
              column={column}
              columnIndex={columnIndex}
            />
          );
        })}
      </tr>
    </thead>
  );
};
