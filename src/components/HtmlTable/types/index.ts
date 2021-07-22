export type ColumnType = 'text' | 'input' | 'select';
// Need to use extends object because of react-table types
// More this like of types in types/react-table-config.d.ts
// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomColumn<Data extends object> = {
  key: keyof Data;
  title: string;
  type: ColumnType;
};
