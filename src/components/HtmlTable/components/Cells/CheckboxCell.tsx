import { observer } from "mobx-react-lite";

import { Props } from "./Cell";
import { BaseRow } from "../../types";

export const CheckboxCell = observer(
  <Row extends BaseRow>(props: Props<Row>) => {
    return (
      <input
        type="checkbox"
        checked={Boolean(props.cellStore.value)}
        onChange={(event) => {
          props.cellStore.updateValue(event.currentTarget.checked);
        }}
      />
    );
  }
);
