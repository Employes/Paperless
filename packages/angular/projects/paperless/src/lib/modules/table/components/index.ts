export * from './table-cell/table-cell.component';
export * from './table-column/table-column.component';
export * from './table-extra-header/table-extra-header.component';
export * from './table/table.component';
export * from './table-row-action/table-row-action.component';

import { TableComponent } from './table/table.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableExtraHeaderComponent } from './table-extra-header/table-extra-header.component';
import { TableRowActionComponent } from './table-row-action/table-row-action.component';

export const TABLE_COMPONENTS = [
	TableComponent,
	TableCellComponent,
	TableColumnComponent,
	TableRowActionComponent,
	TableExtraHeaderComponent,
];
