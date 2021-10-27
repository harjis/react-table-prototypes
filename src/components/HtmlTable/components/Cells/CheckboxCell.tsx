import { observer } from "mobx-react-lite";

import { Props } from "./Cell";
import { BaseRow } from "../../types";

export const CheckboxCell = observer(
  <Row extends BaseRow, ColumnId extends keyof Row>(
    props: Props<Row, ColumnId>
  ) => {
    return (
      <input
        type="checkbox"
        checked={Boolean(props.cellStore.value)}
        onChange={(event) => {
          // I think `as unknown as Row[ColumnId]` here is currently a bit hard to fix
          // One option could be introducing different types of cellStores (BooleanCellStore, StringCellStore)
          // with more strict public interface but dunno if its worth it
          props.cellStore.updateValue(
            event.currentTarget.checked as unknown as Row[ColumnId]
          );
        }}
      />
    );
  }
);
