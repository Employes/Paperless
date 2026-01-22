export * from './p-table-custom-filter.directive';
export * from './p-table-filter-modal.directive';
export * from './p-table-footer.directive';
export * from './p-table-header.directive';
export * from './p-table-ngx.directive';
export * from './p-table.directive';
export * from './p-table-custom-actions.directive';
export * from './p-table-custom-row.directive';

import { PTableCustomActionsDirective } from './p-table-custom-actions.directive';
import { PTableCustomFilterDirective } from './p-table-custom-filter.directive';
import { PTableCustomRowDirective } from './p-table-custom-row.directive';
import { PTableFilterModalDirective } from './p-table-filter-modal.directive';
import { PTableFooterDirective } from './p-table-footer.directive';
import { PTableHeaderDirective } from './p-table-header.directive';
import { PTableNgxDirective } from './p-table-ngx.directive';
import { PTableDirective } from './p-table.directive';

export const TABLE_DIRECTIVES = [
	PTableFooterDirective,
	PTableHeaderDirective,
	PTableDirective,
	PTableNgxDirective,
	PTableFilterModalDirective,
	PTableCustomFilterDirective,
	PTableCustomActionsDirective,
	PTableCustomRowDirective,
];
