import path from 'path';
import { paperless } from '@paperless/core/src/tailwind';

export default {
	important: true,
	content: [
		path.join(__dirname, './stories/**/*.{mdx,tsx,ts}'),
		path.join(__dirname, './packages/core/src/components/**/*.mdx'),
		path.join(
			__dirname,
			'./packages/core/src/components/**/*.stories.@(js|jsx|ts|tsx)'
		),
	],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		paperless,
	],
};
