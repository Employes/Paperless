import eslintParserAngular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import base from '../../eslint.config.js';

export default defineConfig([
	globalIgnores(['./projects/paperless/src/lib/stencil/**/*']),
	{
		extends: [base],
		settings: {
			'better-tailwindcss': {
				tailwindConfig: 'projects/paperless/tailwind.config.ts',
				tsconfig: './tsconfig.json',
			},
		},
	},
	{
		files: ['./projects/paperless/src/**/*.ts'],
		rules: {
			'@angular-eslint/no-inputs-metadata-property': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@angular-eslint/directive-selector': [
				'warn',
				{
					type: ['attribute', 'element'],
					prefix: 'p',
					style: 'camelCase',
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
	{
		files: ['**/*.html'],
		languageOptions: {
			parser: eslintParserAngular.templateParser,
		},
	},
]);
