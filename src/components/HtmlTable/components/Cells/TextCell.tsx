import { Props } from "./Cell";
import { BaseRow } from "../../types";

export const TextCell = <Row extends BaseRow>(props: Props<Row>) => {
  // TODO Check if string
  return <div>{String(props.cellStore.value)}</div>;
};
