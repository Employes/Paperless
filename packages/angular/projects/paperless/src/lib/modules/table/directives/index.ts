export * from './p-table-custom-filter.directive';
export * from './p-table-filter-modal.directive';
export * from './p-table-footer.directive';
export * from './p-table-header.directive';
export * from './p-table-ngx.directive';
export * from './p-table.directive';
export * from './p-table-custom-actions.directive';
export * from './p-table-custom-row.directive';

import { TableCustomActionsDirective } from './p-table-custom-actions.directive';
import { TableCustomFilterDirective } from './p-table-custom-filter.directive';
import { TableCustomRowDirective } from './p-table-custom-row.directive';
import { TableFilterModalDirective } from './p-table-filter-modal.directive';
import { TableFooterDirective } from './p-table-footer.directive';
import { TableHeaderDirective } from './p-table-header.directive';
import { TableNgxDirective } from './p-table-ngx.directive';
import { TableDirective } from './p-table.directive';

export const TABLE_DIRECTIVES = [
	TableFooterDirective,
	TableHeaderDirective,
	TableDirective,
	TableNgxDirective,
	TableFilterModalDirective,
	TableCustomFilterDirective,
	TableCustomActionsDirective,
	TableCustomRowDirective,
];
