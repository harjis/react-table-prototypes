import React from "react";
import { TableInstance } from "react-table";
import cn from "classnames";

import css from "../HtmlTable/HtmlTable.module.css";
import { useSelectedCellContext } from "../../context/selectedCellContext";

type Props<Row extends Record<string, unknown>> = {
  tableInstance: TableInstance<Row>;
};
export const TableBody = <Row extends Record<string, unknown>>(
  props: Props<Row>
): JSX.Element => {
  const { tableInstance } = props;
  const { selectedCell, selectCell } = useSelectedCellContext();
  return (
    <tbody {...tableInstance.getTableBodyProps()}>
      {tableInstance.rows.map((row, rowIndex) => {
        tableInstance.prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.getRowProps().key}>
            {row.cells.map((cell, columnIndex) => {
              const isCellSelected =
                selectedCell &&
                selectedCell.rowIndex === rowIndex &&
                selectedCell.columnIndex === columnIndex;
              return (
                <td
                  {...cell.getCellProps()}
                  key={cell.getCellProps().key}
                  className={cn(css.Cell, {
                    [css.SelectedCell]: isCellSelected,
                    [css.StickyRowHeader]: columnIndex === 0,
                  })}
                  onClick={() => selectCell(rowIndex, columnIndex)}
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
