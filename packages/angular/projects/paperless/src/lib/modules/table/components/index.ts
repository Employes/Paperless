export * from './table-cell/table-cell.component';
export * from './table-column/table-column.component';
export * from './table-extra-header/table-extra-header.component';
export * from './table/table.component';
export * from './table-row-action/table-row-action.component';

import { TableCell } from './table-cell/table-cell.component';
import { TableColumn } from './table-column/table-column.component';
import { TableExtraHeader } from './table-extra-header/table-extra-header.component';
import { TableRowAction } from './table-row-action/table-row-action.component';
import { Table } from './table/table.component';

export const TABLE_COMPONENTS = [
	Table,
	TableCell,
	TableColumn,
	TableRowAction,
	TableExtraHeader,
];
