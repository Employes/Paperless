import { defineConfig, globalIgnores } from 'eslint/config';

import base from '../../eslint.config.js';

export default defineConfig([
	globalIgnores([
		'./dist/**/*',
		'./hydrate/**/*',
		'./loader/**/*',
		'./src/components.d.ts',
	]),
	{
		extends: [base],
	},
	{
		files: ['**/*.tsx'],
		rules: {
			'react/jsx-key': 'off',
			'react/no-unknown-property': 'off',
			'unicorn/no-keyword-prefix': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'unicorn/no-keyword-prefix': 'off',
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'p',
					style: 'kebab-case',
				},
			],
			'@angular-eslint/component-class-suffix': 'off',
		},
	},
	{
		files: ['**/*.stories.ts'],
		rules: {
			'prettier/prettier': 'off',
		},
	},
	{
		files: ['**/test/*.spec.ts', '**/test/*.e2e.ts'],
		rules: {
			'unicorn/no-keyword-prefix': 'off',
		},
	},
]);
