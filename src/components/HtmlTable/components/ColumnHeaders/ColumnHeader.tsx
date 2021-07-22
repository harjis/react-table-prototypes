import React from "react";
import { HeaderGroup } from "react-table";

import css from "../HtmlTable/HtmlTable.module.css";

import { useResizable } from "../../hooks/useResizable";

type Props<Data extends Record<string, unknown>> = {
  column: HeaderGroup<Data>;
};
export const ColumnHeader = <Data extends Record<string, unknown>>(
  props: Props<Data>
): JSX.Element => {
  const { column } = props;
  const {
    dimensions,
    ref,
    startResize,
  } = useResizable<HTMLTableHeaderCellElement>();
  const headerStyles: { width?: number } = {};
  if (dimensions && dimensions.width > 0) {
    headerStyles.width = dimensions.width;
  }
  return (
    <th
      {...column.getHeaderProps()}
      ref={ref}
      className={css.Cell}
      style={{ ...headerStyles }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {column.render("Header")}
        <div onMouseDown={startResize} className={css.Resizer}>
          &nbsp;
        </div>
      </div>
    </th>
  );
};
