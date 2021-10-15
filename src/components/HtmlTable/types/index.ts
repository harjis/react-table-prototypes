export type ColumnType = "text" | "checkbox";

export type BaseRow = { id: string };
export type CustomColumn<Row extends BaseRow> = {
  key: keyof Row;
  title: string;
  type: ColumnType;
};

export type OnCellChange<Row extends BaseRow> = (
  row: Row,
  key: keyof Row,
  newValue: unknown
) => void;
