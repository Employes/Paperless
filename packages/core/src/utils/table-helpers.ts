import { TableColumn } from '../components/helpers/table/column/table-column.component';
import {
	isTableColumnSizesKey,
	TableColumnSizes,
	TableColumnSizesKey,
} from '../types';

export const getTableCellColumnClasses = (
	definition: any | TableColumn,
	variant: 'default' | 'header' | 'loading' | 'actions',
	hasActions: boolean
) => {
	const sizes = definition ? getTableCellSizes(definition, variant) : {};
	const isLastValues = definition
		? getTableCellIsLastValues(definition, variant, hasActions)
		: {};

	return {
		'justify-start': !definition?.align || definition?.align === 'start',
		'justify-center': definition?.align === 'center',
		'justify-end': definition?.align === 'end',
		'font-semibold': variant !== 'header' && definition?.type === 'th',
		'text-storm-dark': variant !== 'header' && definition?.type === 'th',
		'group-hover:flex': variant === 'actions' && hasActions,
		hidden: variant === 'actions' && hasActions,
		...sizes,
		...isLastValues,
	};
};

export const getTableCellSizes = (
	{
		sizes,
	}: {
		sizes: 'auto' | 'hidden' | 'full' | number | TableColumnSizes;
	} /* Table Definition */,
	variant: 'default' | 'header' | 'loading' | 'actions'
) => {
	if (sizes === 'auto' || !sizes) {
		return {
			'w-auto': true,
		};
	}

	if (sizes === 'hidden') {
		return {
			hidden: true,
		};
	}

	if (typeof sizes === 'object') {
		sizes = sizes as TableColumnSizes;
		const classes: any = {};
		let previousSize: TableColumnSizesKey | undefined;

		for (let size in sizes) {
			if (!isTableColumnSizesKey(sizes, size)) {
				continue;
			}

			if (size === 'default') {
				if (sizes.default === 'hidden') {
					classes['hidden'] = true;
					previousSize = size;
					continue;
				}

				classes[`w-${sizes.default}/12`] = true;
				previousSize = size;
				continue;
			}

			const currentValue = sizes[size];
			const previousValue = previousSize ? sizes[previousSize] : null;
			if (
				currentValue !== 'hidden' &&
				previousValue &&
				previousValue === 'hidden' &&
				variant !== 'actions'
			) {
				classes[`${size}:flex`] = true;
			}

			if (currentValue === 'hidden' && variant !== 'actions') {
				classes[`${size}:hidden`] = true;
				previousSize = size;
				continue;
			}

			if (currentValue === 12 || currentValue === 'full') {
				classes[`${size}:w-full`] = true;
			}

			classes[`${size}:w-${currentValue}/12`] = true;
			previousSize = size;
		}

		return classes;
	}

	if (sizes === 12 || sizes === 'full') {
		return {
			'w-full': true,
		};
	}

	// is a number.
	return {
		[`w-${sizes}/12`]: true,
	};
};

export const getTableCellIsLastValues = (
	{
		isLast,
		parsedSizes,
	}: {
		isLast: { [key: string]: boolean };
		parsedSizes: TableColumnSizes;
	} /* Table Definition */,
	variant: 'default' | 'header' | 'loading' | 'actions',
	hasActions: boolean
) => {
	const values: { [key: string]: boolean } = {};

	for (let size of Object.keys(isLast)) {
		let prefix = '';
		if (size !== 'default') {
			prefix = `${size}:`;
		}

		values[`${prefix}pr-4`] = !isLast[size];
		values[`${prefix}pr-0`] = isLast[size];

		values[`${prefix}group-hover:hidden`] =
			(isLast[size] ||
				parsedSizes[size as keyof TableColumnSizes] === 'hidden') &&
			hasActions &&
			parsedSizes[size as keyof TableColumnSizes] !== 12 &&
			variant === 'default';

		const actionsShouldBeAbsolute =
			parsedSizes[size as keyof TableColumnSizes] === 12 &&
			variant === 'actions';
		values[`${prefix}absolute`] = actionsShouldBeAbsolute;
		values[`${prefix}right-6`] = actionsShouldBeAbsolute;

		values[`${prefix}group-hover:flex`] =
			(!isLast[size] &&
				parsedSizes[size as keyof TableColumnSizes] !== 'hidden' &&
				variant === 'default') ||
			variant === 'actions';

		values[`${prefix}flex`] =
			parsedSizes[size as keyof TableColumnSizes] !== 'hidden' &&
			variant !== 'actions';
	}

	return values;
};
