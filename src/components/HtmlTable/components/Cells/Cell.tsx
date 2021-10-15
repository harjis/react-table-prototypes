import React from "react";
import { CellProps } from "react-table";
import { ColumnType, CustomColumn } from "../../types";
import { CheckboxCell } from "./CheckboxCell";
import { TextCell } from "./TextCell";
import cn from "classnames";
import css from "../HtmlTable/HtmlTable.module.css";
import { useSelectedCellContext } from "../../context/selectedCellContext";

export const Cell = React.memo(
  <Row extends Record<string, unknown>, Value>(
    props: CellProps<Row, Value>
  ) => {
    // @ts-ignore
    const { cell, columnIndex, rowIndex } = props;
    const { selectedCell, selectCell } = useSelectedCellContext();
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
        {getComponent(
          props,
          getCellsColumnType(props.originalColumns, props.column.id)
        )}
      </td>
    );
  }
);
function getCellsColumnType<Row extends Record<string, unknown>>(
  originalColumns: CustomColumn<Row>[],
  columnKey: string
): ColumnType {
  const column = originalColumns.find((c) => c.key === columnKey);
  if (!column) {
    throw new Error(
      `Column with id: ${columnKey} was not found in ${originalColumns
        .map((c) => c.key)
        .join(", ")}`
    );
  }

  return column.type;
}

function getComponent<Row extends Record<string, unknown>, Value>(
  props: CellProps<Row, Value>,
  type: ColumnType
): JSX.Element {
  switch (type) {
    case "text":
      // @ts-ignore
      return <TextCell {...props} />;
    case "checkbox":
      // @ts-ignore
      return <CheckboxCell {...props} />;
    default:
      return <div>do something</div>;
  }
}
