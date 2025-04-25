import type { StorybookConfig } from '@storybook/web-components-vite';

import { dirname, join } from 'path';
const { BASE_PATH } = process.env;

function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
	staticDirs: ['../packages/core/dist', './public'],

	stories: [
		'../stories/**/*.story.mdx',
		'../packages/core/src/components/**/*.story.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
		'../packages/core/src/components/**/*.stories.@(js|jsx|ts|tsx)',
	],

	previewHead: head => `${head}
		<script type="module" src="/build/paperless.esm.js"></script>
    	<script nomodule src="/build/paperless.js"></script>
   		<link rel="stylesheet" href="/paperless/paperless.css">
  `,

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-styling-webpack'),
		// getAbsolutePath('@pxtrn/storybook-addon-docs-stencil'),
	],
	framework: {
		name: getAbsolutePath('@storybook/web-components-vite'),
		options: {},
	},

	docs: {
		autodocs: true,
	},

	async viteFinal(config) {
		config.base = BASE_PATH || config.base;

		const { mergeConfig } = await import('vite');
		const { liveReload } = await import('vite-plugin-live-reload');
		const { default: tailwindCss } = await import("@tailwindcss/vite");

		return mergeConfig(config, {
			plugins: [
				liveReload([
					'packages/core/dist/build/paperless.esm.js',
					'packages/core/dist/build/paperless.js',
				]),
				tailwindCss()
			],
			build: {
				chunkSizeWarningLimit: 1000,
				rollupOptions: {
					output: {
						manualChunks: {
							lit: ['lit'],
							react: ['react'],
							'react-dom': ['react-dom'],
							'react/jsx-runtime': ['react/jsx-runtime'],
						},
					},
				},
			},
		});
	},
	// https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
	typescript: {
		check: true, // type-check stories during Storybook build
	},
};

export default config;
