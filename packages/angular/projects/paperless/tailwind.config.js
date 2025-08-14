const { paperless } = require('@paperless/core');
const path = require('path');

module.exports = {
	important: true,
	content: [path.join(__dirname, './src/**/*.{html,scss,ts}')],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-animate'),
		require('tailwind-scrollbar-hide'),
		paperless,
	],
};
