export const asBoolean = (
	value: undefined | null | boolean | string,
	defaultValue: boolean = false
) => {
	if (value === undefined || value === null) {
		return defaultValue ?? false;
	}

	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}

	return !!value;
};
