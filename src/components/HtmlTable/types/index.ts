export type ColumnType = "text" | "checkbox";

export type CustomColumn<Row extends Record<string, unknown>> = {
  key: keyof Row;
  title: string;
  type: ColumnType;
};

export type OnCellChange<Row extends Record<string, unknown>> = (
  row: Row,
  key: keyof Row,
  newValue: unknown
) => void;
