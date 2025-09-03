const { paperless } = require('@paperless/core');
const path = require('path');

module.exports = {
	important: true,
	darkMode: [
		'variant',
		[
			'&:where(:host([data-theme=dark]),:host([data-theme=dark]) *)',
			'&:where([data-theme=dark],[data-theme=dark] *)',
		],
	],
	content: [path.join(__dirname, './src/**/*.{html,scss,ts}')],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-animate'),
		require('tailwind-scrollbar-hide'),
		paperless,
	],
};
