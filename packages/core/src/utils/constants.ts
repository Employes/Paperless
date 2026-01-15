import { TableColumnSizes } from '../types/table';

// Select
export const SELECT_DEFAULT_MAX_DISPLAYED_ITEMS = 10;

// Pagination
export const PAGINATION_DEFAULT_PAGE_SIZE = 12;
export const PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS = [12, 24, 68, 136];

// Table column
export const TABLE_COLUMN_SIZES = [
	'default',
	'tablet',
	'desktop-xs',
	'desktop-sm',
	'desktop',
	'desktop-lg',
	'desktop-xl',
] as (keyof TableColumnSizes)[];
