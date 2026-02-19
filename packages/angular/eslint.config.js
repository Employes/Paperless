import { defineConfig, globalIgnores } from 'eslint/config';

import base from '../../eslint.config.js';

export default defineConfig([
	globalIgnores(['./projects/paperless/src/lib/stencil/**/*']),
	{
		extends: [base],
		settings: {
			'better-tailwindcss': {
				tailwindConfig: 'projects/paperless/tailwind.config.ts',
			},
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/no-inputs-metadata-property': 'off',
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: ['attribute', 'element'],
					prefix: 'p',
					style: undefined,
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'p',
					style: 'kebab-case',
				},
			],
		},
	},
]);
