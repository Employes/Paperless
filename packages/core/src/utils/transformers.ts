export const camelToSnakeCase = (str: string) =>
	str.replaceAll(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const snakeToCamelCase = (str: string) =>
	str
		.toLowerCase()
		.replaceAll(/([_-][a-z])/g, group =>
			group.toUpperCase().replace('-', '').replace('_', '')
		);

export const kebabToSpaces = str => str.replaceAll('-', ' ');

export const titleCase = (str: string) =>
	str.replaceAll(
		/\w\S*/g,
		text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
	);
