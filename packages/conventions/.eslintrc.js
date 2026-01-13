module.exports = {
	root: true,
	ignorePatterns: ['**/*'],
	plugins: ['only-error', 'import', 'unicorn', 'ava'],
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
				'arrow-body-style': ['error', 'as-needed'],
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
				'plugin:@angular-eslint/template/process-inline-templates',
				'prettier',
			],
		},
		{
			files: ['*.html'],
			plugins: ['@angular-eslint/template'],
			extends: ['plugin:@angular-eslint/all'],
			rules: {
				'@angular-eslint/template/attributes-order': [
					'error',
					{
						alphabetical: true,
						order: [
							'STRUCTURAL_DIRECTIVE',
							'TEMPLATE_REFERENCE',
							'ATTRIBUTE_BINDING',
							'INPUT_BINDING',
							'OUTPUT_BINDING',
							'TWO_WAY_BINDING',
						],
					},
				],
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			extends: ['plugin:unicorn/all', 'plugin:import/recommended'],
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
