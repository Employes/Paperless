// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	printWidth: 80,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'avoid',
	singleAttributePerLine: true,
	plugins: ['prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.html',
			options: {
				parser: 'html',
			},
		},
		{
			files: '*.component.html',
			options: {
				parser: 'angular',
			},
		},
	],
};

module.exports = config;
