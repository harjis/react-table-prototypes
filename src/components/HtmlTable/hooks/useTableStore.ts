import { useState } from "react";

import { BaseRow, CustomColumn } from "../types";
import { TableStore } from "../stores/TableStore";

type Props<Row extends BaseRow> = {
  columns: CustomColumn<Row>[];
  rows: Row[];
};
export const useTableStore = <Row extends BaseRow>(props: Props<Row>) => {
  const [tableStore] = useState(
    () => new TableStore({ columns: props.columns, rows: props.rows })
  );

  return tableStore;
};
