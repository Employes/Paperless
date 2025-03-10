import { TableQuickFilter } from './base';

export const createFormFilters = (
	values: { [key: string]: any },
	quickFilters: TableQuickFilter[],
	quickFilterKey?: string
) => {
	const filters = [];
	let quickFilter = null;

	for (const key of Object.keys(values)) {
		const value = values[key];
		if (
			(key !== quickFilterKey &&
				!(value instanceof Date) &&
				typeof value !== 'object' &&
				isNaN(value) &&
				!value?.length) ||
			value === null ||
			value === undefined
		) {
			continue;
		}

		if (quickFilterKey && key === quickFilterKey) {
			quickFilter = quickFilters.find(f => f.value === value);

			continue;
		}

		filters.push({
			key,
			value,
		});
	}

	return {
		filters,
		quickFilter,
	};
};
