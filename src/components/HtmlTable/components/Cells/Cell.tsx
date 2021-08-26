import React from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";

import css from "./Cell.module.css";
import { BaseRow, ColumnType } from "../../types";
import { CheckboxCell } from "./CheckboxCell";
import { TextCell } from "./TextCell";
import { CellStore } from "../../stores/CellStore";

export type Props<Row extends BaseRow> = {
  cellStore: CellStore<Row>;
};
export const Cell = observer(<Row extends BaseRow>(props: Props<Row>) => {
  const { cellStore } = props;
  return (
    <td
      role="cell"
      key={String(cellStore.columnId)}
      className={cn(css.Cell, {
        [css.SelectedCell]: cellStore.isSelected,
        [css.StickyRowHeader]: cellStore.columnIndex === 0,
      })}
      onClick={() => cellStore.toggleSelection()}
    >
      {getComponent(props, props.cellStore.type)}
    </td>
  );
});

function getComponent<Row extends BaseRow>(
  props: Props<Row>,
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
