import { cva } from 'class-variance-authority';
import { TableColumn } from '../components/helpers/table/column/table-column.component';
import {
	isTableColumnSizesKey,
	TableColumnSizes,
	TableColumnSizesKey,
} from '../types';

export const getTableCellColumnClasses = (
	definition: any | TableColumn,
	variant: 'default' | 'header' | 'loading'
) => {
	const sizes = definition ? getTableCellSizes(definition, variant) : {};

	return {
		flex: true,
		'items-center': true,
		'gap-4': true,
		'justify-start': !definition?.align || definition?.align === 'start',
		'justify-center': definition?.align === 'center',
		'justify-end': definition?.align === 'end',
		'font-semibold': variant !== 'header' && definition?.type === 'th',
		'text-storm-dark': variant !== 'header' && definition?.type === 'th',
		...sizes,
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

export const floatingMenuContainerClass = cva(['sticky self-center'], {
	variants: {
		hasFooter: {
			true: 'mt-4 -mb-5 bottom-11 z-[3]',
			false: 'my-4 bottom-0',
		},
		active: {
			false: 'animate-floating-menu-container-out',
			true: 'animate-floating-menu-container-in',
		},
		shown: {
			false: 'hidden',
			true: 'inline-block',
		},
	},
});
