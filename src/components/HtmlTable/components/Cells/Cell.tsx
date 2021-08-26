import { CellProps } from "react-table";
import { ColumnType, CustomColumn } from "../../types";
import { CheckboxCell } from "./CheckboxCell";
import { TextCell } from "./TextCell";

export const Cell = <Row extends Record<string, unknown>, Value>(
  props: CellProps<Row, Value>
) => {
  return getComponent(
    props,
    getCellsColumnType(props.originalColumns, props.column.id)
  );
};
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
      return <TextCell {...props} />;
    case "checkbox":
      return <CheckboxCell {...props} />;
    default:
      return <div>do something</div>;
  }
}
