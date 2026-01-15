/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable unicorn/prefer-module */
import path from 'node:path';

import { paperless } from './tailwind';

export default {
	darkMode: [
		'variant',
		[
			'&:where(:host([data-theme=dark]),:host([data-theme=dark]) *)',
			'&:where([data-theme=dark],[data-theme=dark] *)',
		],
	],
	content: [path.join(__dirname, './utils/table-helpers.ts')],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwind-scrollbar-hide'),
		paperless,
	],
};
