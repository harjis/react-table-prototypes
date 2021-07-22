import { Column } from 'react-table';

import { CustomColumn } from '../types';

export const customColumnsToReactTableColumns = <D extends Record<string, unknown>>(
  column: CustomColumn<D>,
): Column<D> => ({ accessor: column.key, Header: column.title });
