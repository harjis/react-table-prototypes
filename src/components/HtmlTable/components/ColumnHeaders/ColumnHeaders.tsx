import React from "react";
import { TableInstance } from "react-table";

import s from "./ColumnHeaders.module.css";
import { ColumnHeader } from "./ColumnHeader";

type Props<Row extends Record<string, unknown>> = {
  tableInstance: TableInstance<Row>;
};
export const ColumnHeaders = <Row extends Record<string, unknown>>(
  props: Props<Row>
): JSX.Element => {
  const { tableInstance } = props;

  return (
    <thead className={s.stickyColumnHeaders}>
      {tableInstance.headerGroups.map((headerGroup) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          key={headerGroup.getHeaderGroupProps().key}
        >
          {headerGroup.headers.map((column, columnIndex) => {
            return (
              <ColumnHeader
                key={column.getHeaderProps().key}
                column={column}
                columnIndex={columnIndex}
              />
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
