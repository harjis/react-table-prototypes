import React from "react";
import { observer } from "mobx-react-lite";

import { BaseRow } from "../../types";
import { TableStore } from "../../stores/TableStore";
import { Cell } from "../Cells/Cell";

type Props<Row extends BaseRow> = {
  tableStore: TableStore<Row>;
};
export const TableBody = observer(
  <Row extends BaseRow>(props: Props<Row>): JSX.Element => {
    return (
      <tbody role="rolegroup">
        {props.tableStore.rows.map((rowStore) => {
          return (
            <tr role="row" key={rowStore.rowId}>
              {rowStore.cells.map((cellStore) => {
                return <Cell cellStore={cellStore} />;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
);
