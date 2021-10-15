import React from "react";
import { TableInstance } from "react-table";

type Props<Row extends Record<string, unknown>> = {
  tableInstance: TableInstance<Row>;
};
export const TableBody = <Row extends Record<string, unknown>>(
  props: Props<Row>
): JSX.Element => {
  const { tableInstance } = props;

  return (
    <tbody {...tableInstance.getTableBodyProps()}>
      {tableInstance.rows.map((row, rowIndex) => {
        tableInstance.prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.getRowProps().key}>
            {row.cells.map((cell, columnIndex) => {
              return cell.render("Cell", { columnIndex, rowIndex });
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
