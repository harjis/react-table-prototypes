import css from '../HtmlTable/HtmlTable.module.css';
import React from 'react';
import { TableInstance } from 'react-table';

type Props<Data extends Record<string, unknown>> = {
  tableInstance: TableInstance<Data>;
};
export const TableBody = <Data extends Record<string, unknown>>(
  props: Props<Data>,
): JSX.Element => {
  const { tableInstance } = props;
  return (
    <tbody {...tableInstance.getTableBodyProps()}>
      {tableInstance.rows.map((row) => {
        tableInstance.prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.getRowProps().key}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()} key={cell.getCellProps().key} className={css.Cell}>
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
