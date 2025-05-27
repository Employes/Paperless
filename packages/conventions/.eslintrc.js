module.exports = {
	root: true,
	ignorePatterns: ['**/*'],
	plugins: ['@nrwl/nx', 'only-error', 'import', 'unicorn', 'ava'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
			rules: {
				'import/order': [
					'error',
					{
						pathGroups: [
							{
								pattern: '@paperless/**',
								group: 'external',
								position: 'after',
							},
						],
						pathGroupsExcludedImportTypes: ['builtin'],
						groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
						'newlines-between': 'always',
						alphabetize: {
							order: 'asc',
							caseInsensitive: true,
						},
					},
				],
			},
			extends: [
				'plugin:@angular-eslint/all',
				'plugin:@nrwl/nx/angular',
				'plugin:@angular-eslint/template/process-inline-templates',
				'prettier',
			],
		},
		{
			files: ['*.html'],
			extends: [
				'plugin:@nrwl/nx/angular-template',
				'plugin:@angular-eslint/all',
			],
			rules: {
				'@angular-eslint/template/attribute-order': 'error',
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@nrwl/nx/typescript',
				'plugin:unicorn/all',
				'plugin:import/recommended',
			],
			rules: {
				'unicorn/no-null': 'off',
				'import/no-unresolved': 'off',
				'unicorn/prevent-abbreviations': 'off',
				'unicorn/no-nested-ternary': 'off',
				'unicorn/consistent-function-scoping': [
					'error',
					{
						checkArrowFunctions: false,
					},
				],
			},
		},
		{
			files: ['*.js', '*.jsx'],
			extends: ['plugin:@nrwl/nx/javascript'],
			rules: {},
		},
		{
			files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
			extends: ['plugin:ava/recommended'],
			env: {
				jest: true,
			},
			rules: {},
		},
		{
			files: ['*.json', '*.json5'],
			extends: ['plugin:jsonc/recommended-with-jsonc'],
			rules: {},
		},
	],
};
