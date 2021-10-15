import { CellProps } from "react-table";

export const TextCell = <Row extends Record<string, unknown>, Value>(
  props: CellProps<Row, Value>
) => {
  return <div>{props.value}</div>;
};
