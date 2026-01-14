import { defineConfig } from 'eslint/config';

import base from '../../../../eslint.config.js';

export default defineConfig([
	{
		extends: [base],
		ignores: ['./sdk/**/*'],
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: '',
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
]);
