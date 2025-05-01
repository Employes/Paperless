const { paperless } = require('@paperless/core');
const path = require('path');

module.exports = {
	important: true,
	content: [
		path.join(__dirname, './src/**/*.{html,scss,ts}'),
		path.join(__dirname, '../paperless/src/**/*.{html,scss,ts}'),
		path.join(__dirname, '../../../core/src/utils/table-helpers.ts'),
	],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-animate'),
		require('tailwind-scrollbar-hide'),
		paperless,
	],
};
