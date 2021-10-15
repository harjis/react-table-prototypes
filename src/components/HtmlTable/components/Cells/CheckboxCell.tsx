import React from "react";
import { CellProps } from "react-table";

export const CheckboxCell = React.memo(
  <Row extends Record<string, unknown>, Value>(
    props: CellProps<Row, Value>
  ) => {
    return (
      <input
        type="checkbox"
        checked={Boolean(props.value)}
        onChange={(event) => {
          props.onCellChange(
            props.row.original,
            props.column.id,
            event.currentTarget.checked
          );
        }}
      />
    );
  }
);
