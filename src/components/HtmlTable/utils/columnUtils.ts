import { Column } from "react-table";

import { CustomColumn } from "../types";
import { Cell } from "../components/Cells/Cell";

export const customColumnsToReactTableColumns = <
  Row extends Record<string, unknown>
>(
  column: CustomColumn<Row>
): Column<Row> => ({ accessor: column.key, Header: column.title, Cell });
