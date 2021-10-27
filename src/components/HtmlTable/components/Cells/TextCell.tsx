import { Props } from "./Cell";
import { BaseRow } from "../../types";

export const TextCell = <Row extends BaseRow, ColumnId extends keyof Row>(
  props: Props<Row, ColumnId>
) => {
  return <div>{String(props.cellStore.value)}</div>;
};
