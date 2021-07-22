/* eslint-disable @typescript-eslint/ban-types */
import {
  UseResizeColumnsOptions,
  UseTableColumnOptions,
  UseTableColumnProps,
  UseTableHooks,
  UseTableInstanceProps,
} from 'react-table';
import React from 'react';
/**
 * Need to use: D extends object = {}
 * TS best practice doesn't work at the moment: D extends Record<string, unknown> = Record<string, unknown>
 */
declare module 'react-table' {
  export interface TableOptions<D extends object = {}>
    extends UseResizeColumnsOptions<D>,
      UseResizeColumnsOptions<D> {}

  export interface Hooks<D extends object = {}> extends UseTableHooks<D>, UseRowSelectHooks<D> {}

  export interface TableInstance<D extends object = {}> extends UseTableInstanceProps<D> {}

  export interface ColumnInterface<D extends object = {}>
    extends UseTableColumnOptions<D>,
      UseResizeColumnsColumnOptions<D> {}

  // TableResizerProps is empty in lib defs which to me looks incorrect
  interface TableResizerProps {
    onMouseDown: (event: React.MouseEvent) => void;
  }

  export interface ColumnInstance<D extends object = {}>
    extends UseTableColumnProps<D>,
      UseResizeColumnsColumnProps<D> {}
}
