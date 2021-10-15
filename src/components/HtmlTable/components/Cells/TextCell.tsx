import React from "react";
import { CellProps } from "react-table";

export const TextCell = React.memo(
  <Row extends Record<string, unknown>, Value>(
    props: CellProps<Row, Value>
  ) => {
    return <div>{props.value}</div>;
  }
);
