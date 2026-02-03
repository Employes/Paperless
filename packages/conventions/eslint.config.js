import eslint from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import earlyReturnPlugin from '@regru/eslint-plugin-prefer-early-return';
import angularPlugin from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsoncPlugin from 'eslint-plugin-jsonc';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import typescriptPlugin from 'typescript-eslint';

export default defineConfig([
	eslint.configs.recommended,
	prettierPlugin,
	...jsoncPlugin.configs['flat/recommended-with-json'],
	...jsoncPlugin.configs['flat/recommended-with-jsonc'],

	nxPlugin.configs['flat/javascript'],
	nxPlugin.configs['flat/react-typescript'],
	nxPlugin.configs['flat/angular'],
	{
		languageOptions: {
			globals: globals.builtin,
		},
		settings: {
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx'],
			},
			'import/resolver': {
				typescript: true,
				node: true,
			},
		},
	},
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		extends: [importPlugin.flatConfigs.recommended, unicornPlugin.configs.all],
		plugins: { '@regru/prefer-early-return': earlyReturnPlugin },
		rules: {
			'no-else-return': 'error',
			'@regru/prefer-early-return/prefer-early-return': [
				'warn',
				{
					maximumStatements: 1,
				},
			],
			'arrow-body-style': ['error', 'as-needed'],
			'unicorn/no-null': 'off',
			'unicorn/prevent-abbreviations': 'off',
			'unicorn/no-nested-ternary': 'off',
			'unicorn/consistent-function-scoping': [
				'error',
				{
					checkArrowFunctions: false,
				},
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^h|_$',
					caughtErrorsIgnorePattern: '^h|_$',
					varsIgnorePattern: '^h|_$',
				},
			],
			'import/no-unresolved': 'off',
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
	},
	{
		files: ['**/*.{tsx,jsx}'],
		extends: [reactPlugin.configs.flat.recommended],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-sort-props': [
				'error',
				{
					callbacksLast: true,
					shorthandLast: true,
				},
			],
		},
	},
	{
		files: ['**/*.ts'],
		extends: [
			typescriptPlugin.configs.recommended,
			typescriptPlugin.configs.stylistic,
			angularPlugin.configs.tsRecommended,
		],
		processor: angularPlugin.processInlineTemplates,
		rules: {
			'@angular-eslint/prefer-standalone': 'off',
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
		},
	},
	{
		files: ['**/*.html'],
		extends: [angularPlugin.configs.templateRecommended],
		rules: {
			'@angular-eslint/template/prefer-self-closing-tags': ['error'],
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
]);
