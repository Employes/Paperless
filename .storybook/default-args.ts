import { getComponentMetaData } from '@pxtrn/storybook-addon-docs-stencil';

export const extractDefaultArgs = (componentName: string, dashCase = false) => {
	const metaData = getComponentMetaData(componentName);
	const { props } = metaData;

	return (
		props &&
		props
			.filter(prop => prop.default && !prop.optional)
			.map(prop => {
				let result: boolean | number | string | Date | undefined;
				let { default: value, type } = prop;

				if (type.includes('=>')) {
					type = 'undefined';
				}

				switch (type) {
					case 'undefined':
						result = undefined;
						break;
					case 'boolean':
					case 'number':
						try {
							result = JSON.parse(value);
						} catch (err) {
							// just swallow the error, value will be undefined in this case
						}
						break;
					case 'date':
						result = new Date(value);
						break;
					default:
						// TODO - handle arrays, objects, ...
						result = value.trim().replace(/^'(.+(?='$))'$/, '$1');
				}

				return { ...prop, default: result };
			})
			.reduce((acc, { attr, name, default: value }) => {
				if (value === undefined) {
					return acc;
				}

				const key = dashCase === true ? attr || name : name;

				acc[key] = value;
				return acc;
			}, {} as Record<string, boolean | number | string>)
	);
};
