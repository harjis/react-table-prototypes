import React from "react";
import cn from "classnames";

import css from "./ColumnHeader.module.css";
import { useResizable } from "../../hooks/useResizable";
import { BaseRow, CustomColumn } from "../../types";

type Props<Row extends BaseRow> = {
  column: CustomColumn<Row>;
  columnIndex: number;
};
export const ColumnHeader = <Row extends BaseRow>(
  props: Props<Row>
): JSX.Element => {
  const { column } = props;
  const { dimensions, ref, startResize } =
    useResizable<HTMLTableHeaderCellElement>();
  const headerStyles: { width?: number } = {};
  if (dimensions && dimensions.width > 0) {
    headerStyles.width = dimensions.width;
  }

  return (
    <th
      colSpan={1}
      role="columnheader"
      ref={ref}
      className={cn(css.Cell, {
        [css.StickyRowHeader]: props.columnIndex === 0,
      })}
      style={{ ...headerStyles }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {column.title}
        <div onMouseDown={startResize} className={css.Resizer}>
          &nbsp;
        </div>
      </div>
    </th>
  );
};
