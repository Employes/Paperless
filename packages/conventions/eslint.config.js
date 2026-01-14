// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';

import typescriptPlugin from 'typescript-eslint';
import angularPlugin from 'angular-eslint';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import unicornPlugin from 'eslint-plugin-unicorn';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import nxPlugin from '@nx/eslint-plugin';
import jsoncPlugin from 'eslint-plugin-jsonc';

export default defineConfig([
	eslint.configs.recommended,
	prettierPlugin,
	...jsoncPlugin.configs['flat/recommended-with-json'],
	...jsoncPlugin.configs['flat/recommended-with-jsonc'],
	unicornPlugin.configs.all,
	importPlugin.flatConfigs.recommended,
	{
		languageOptions: {
			globals: globals.builtin,
		},
		plugins: {
			'@nx': nxPlugin,
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
		rules: {
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
		files: ['*.js'],
		plugins: {
			'@nx': nxPlugin,
		},
		extends: ['@nx/javascript'],
	},
	{
		files: ['*.tsx', '*.jsx'],
		plugins: {
			'@nx': nxPlugin,
		},
		extends: ['@nx/react', '@nx/javascript'],
	},
	{
		files: ['**/*.ts'],
		plugins: {
			'@nx': nxPlugin,
		},
		extends: [
			'@nx/angular',
			typescriptPlugin.configs.recommended,
			typescriptPlugin.configs.stylistic,
			angularPlugin.configs.tsRecommended,
		],
		processor: angularPlugin.processInlineTemplates,
		rules: {
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
