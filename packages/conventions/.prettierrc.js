// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	printWidth: 140,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: 'avoid',
	singleAttributePerLine: true,
	plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
