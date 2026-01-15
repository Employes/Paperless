/* eslint-disable @typescript-eslint/no-explicit-any */
const getComponentClosestLanguage = (element: HTMLElement): string => {
	const closestElement = element.closest('[lang]') as HTMLElement;
	const htmlElement = document.documentElement;

	return closestElement ? closestElement.lang : (htmlElement?.lang ?? 'en');
};

const fetchLocaleStringsForComponent = (
	componentName: string,
	locale: string
): Promise<any> =>
	new Promise((resolve, reject): void => {
		fetch(`/assets/i18n/${componentName}.i18n.${locale}.json`).then(
			result => {
				if (result.ok) {
					resolve(result.json());
					return;
				}

				reject();
			},
			() => reject()
		);
	});

const cache = {};

export const getLocaleComponentStrings = async (
	element: HTMLElement
): Promise<any> => {
	const componentName = element.tagName.toLowerCase().replace('p-', '');
	const componentLanguage = getComponentClosestLanguage(element);
	let strings;

	if (cache[componentName]?.[componentLanguage]) {
		return cache[componentName][componentLanguage];
	}

	try {
		strings = await fetchLocaleStringsForComponent(
			componentName,
			componentLanguage
		);
	} catch {
		console.warn(
			`no locale for ${componentName} (${componentLanguage}) loading default locale en.`
		);
		strings = await fetchLocaleStringsForComponent(componentName, 'en');
	}

	if (!cache[componentName]) {
		cache[componentName] = {};
	}

	if (!cache[componentName][componentLanguage]) {
		cache[componentName][componentLanguage] = {};
	}

	cache[componentName][componentLanguage] = strings;
	return strings;
};

export const formatTranslation = (str: string, data?: any) => {
	if (!str || !data) {
		return str;
	}

	for (const key of Object.keys(data)) {
		const regex = `{${key}}`;
		str = str.replaceAll(new RegExp(regex, 'g'), data[key]);
	}

	return str;
};
