import {
  UseTableColumnOptions,
  UseTableColumnProps,
  UseTableHooks,
  UseTableInstanceProps,
  UseTableRowProps,
} from "react-table";
import { CustomColumn, OnCellChange } from "./index";

// Generics in this file _need_ to be named 'D'. Anything else will results in compilation errors.
interface CustomColumnProps<D extends Record<string, unknown> = {}> {
  onCellChange: OnCellChange<D>;
  originalColumns: CustomColumn<D>[];
}

declare module "react-table" {
  export interface TableOptions<D extends Record<string, unknown> = {}>
    extends CustomColumnProps<D> {}

  export interface Hooks<D extends Record<string, unknown> = {}>
    extends UseTableHooks<D> {}

  export interface TableInstance<D extends Record<string, unknown> = {}>
    extends UseTableInstanceProps<D> {}

  export interface ColumnInterface<D extends Record<string, unknown> = {}>
    extends UseTableColumnOptions<D> {}

  export interface ColumnInstance<D extends Record<string, unknown> = {}>
    extends UseTableColumnProps<D> {}

  export interface Row<D extends Record<string, unknown> = {}>
    extends UseTableRowProps<D> {}
}
