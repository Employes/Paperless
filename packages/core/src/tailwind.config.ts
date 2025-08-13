import path from 'path';
import { paperless } from './tailwind';

export default {
	important: true,
	darkMode: ['selector', ':host([data-theme="dark"])'],
	content: [path.join(__dirname, './utils/table-helpers.ts')],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwind-scrollbar-hide'),
		paperless,
	],
};
