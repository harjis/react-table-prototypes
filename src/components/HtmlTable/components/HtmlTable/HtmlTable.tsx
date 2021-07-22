import React, { useMemo } from "react";
import { useTable } from "react-table";
import cn from "classnames";

import css from "./HtmlTable.module.css";

import { CustomColumn } from "../../types";
import { customColumnsToReactTableColumns } from "../../utils/columnUtils";
import { ColumnHeaders } from "../ColumnHeaders/ColumnHeaders";
import { TableBody } from "../TableBody/TableBody";

export type Props<Data extends Record<string, unknown>> = {
  columns: CustomColumn<Data>[];
  data: Data[];
  fullWidth?: boolean;
};

export const HtmlTable = <Data extends Record<string, unknown>>(
  props: Props<Data>
): JSX.Element => {
  const columns = useMemo(
    () => props.columns.map(customColumnsToReactTableColumns),
    [props.columns]
  );
  const data = useMemo(() => props.data, [props.data]);
  const tableInstance = useTable({
    columns,
    data,
  });

  return (
    <table
      {...tableInstance.getTableProps()}
      className={cn(css.Container, { [css.FullWidth]: props.fullWidth })}
    >
      <ColumnHeaders tableInstance={tableInstance} />
      <TableBody tableInstance={tableInstance} />
    </table>
  );
};
