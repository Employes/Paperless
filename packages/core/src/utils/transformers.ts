export const camelToSnakeCase = (str: string) =>
	str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const snakeToCamelCase = (str: string) =>
	str
		.toLowerCase()
		.replace(/([-_][a-z])/g, group =>
			group.toUpperCase().replace('-', '').replace('_', '')
		);

export const kebabToSpaces = str => str.replace(/-/g, ' ');

export const titleCase = (str: string) =>
	str.replace(
		/\w\S*/g,
		text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
	);
