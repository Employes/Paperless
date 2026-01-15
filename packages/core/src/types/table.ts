/* eslint-disable @typescript-eslint/no-explicit-any */
export type QuickFilterTextFunction = () => string;

export interface QuickFilter {
	identifier: string;
	text: string | QuickFilterTextFunction;
	count?: number;
	default?: boolean;
}

export interface RowClickEvent {
	item: any;
	ctrlDown: boolean;
}

export interface TableDefinitionData {
	value: any;
	item: any;
	index: number;
	rowIndex: number;
}

export type TableDefinitionTemplateFunc = (data: TableDefinitionData) => any;

export interface TableColumnSizes {
	default: number | 'hidden' | 'full';
	tablet?: number | 'hidden' | 'full';
	'desktop-xs'?: number | 'hidden' | 'full';
	'desktop-sm'?: number | 'hidden' | 'full';
	desktop?: number | 'hidden' | 'full';
	'desktop-lg'?: number | 'hidden' | 'full';
	'desktop-xl'?: number | 'hidden' | 'full';
}

export type TableColumnSizesKey =
	| 'default'
	| 'tablet'
	| 'desktop-xs'
	| 'desktop-sm'
	| 'desktop'
	| 'desktop-lg'
	| 'desktop-xl';

export function isTableColumnSizesKey(
	x: TableColumnSizes,
	k: PropertyKey
): k is keyof TableColumnSizes {
	return k in x;
}
