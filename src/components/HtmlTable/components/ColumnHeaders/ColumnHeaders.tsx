import React from 'react';
import { TableInstance } from 'react-table';

import { ColumnHeader } from './ColumnHeader';

type Props<Data extends Record<string, unknown>> = {
  tableInstance: TableInstance<Data>;
};
export const ColumnHeaders = <Data extends Record<string, unknown>>(
  props: Props<Data>,
): JSX.Element => {
  const { tableInstance } = props;

  return (
    <thead>
      {tableInstance.headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
          {headerGroup.headers.map((column) => {
            return <ColumnHeader key={column.getHeaderProps().key} column={column} />;
          })}
        </tr>
      ))}
    </thead>
  );
};
