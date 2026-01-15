import { angularOutputTarget as angular } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import tailwind, {
	setPluginConfigurationDefaults,
	tailwindGlobal,
	tailwindHMR,
} from 'stencil-tailwind-plugin';

import { exportsOutputTarget } from './generators/packagejson-exports-output';
import { storiesOutputTarget } from './generators/stencil-storybook-stories-output';
import tailwindConfig from './src/tailwind.config';

setPluginConfigurationDefaults({
	enableDebug: false,
	tailwindCssContents:
		'@tailwind utilities;@tailwind components; * { @apply box-border; }',
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tailwindConf: tailwindConfig as any,
});

export const config: Config = {
	namespace: 'paperless',
	globalStyle: 'src/style/paperless.scss',
	watchIgnoredRegex: [/.*\.story\.mdx$/, /.*\.stories\.ts$/],
	validatePrimaryPackageOutputTarget: true,
	extras: {
		enableImportInjection: true,
	},
	plugins: [sass(), tailwindGlobal(), tailwind(), tailwindHMR(), inlineSvg()],
	devServer: {
		address: '0.0.0.0',
		port: 8080,
		reloadStrategy: 'pageReload',
	},
	testing: {
		browserArgs: ['--no-sandbox'],
	},
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../loader',
		},
		{
			type: 'dist-custom-elements',
			customElementsExportBehavior: 'single-export-module',
			externalRuntime: false,
			isPrimaryPackageOutputTarget: true,
		},
		storiesOutputTarget(),
		exportsOutputTarget(),
		angular({
			componentCorePackage: '@paperless/core',
			outputType: 'standalone',
			directivesProxyFile:
				'../angular/projects/paperless/src/lib/stencil/components.ts',
			directivesArrayFile:
				'../angular/projects/paperless/src/lib/stencil/index.ts',
			excludeComponents: [
				'p-table',
				'p-table-column',
				'p-table-extra-header',
				'p-table-row-action',
				'p-table-cell',
				'p-toast-container',
			],
		}),
		react({
			outDir: '../react/src',
		}),
		{
			type: 'docs-readme',
		},
		{
			type: 'docs-json',
			file: 'component-docs.json',
		},
		{
			type: 'www',
			serviceWorker: undefined, // disable service workers
		},
		{
			type: 'www',
			dir: 'dist',
			copy: [
				{ src: 'assets' },
				{ src: 'tailwind.config.ts' },
				{ src: 'tailwind' },
				{ src: 'style' },
				{
					src: '**/*.i18n.*.json',
					dest: 'assets/i18n',
				},
			],
		},
		{
			type: 'dist-hydrate-script',
			dir: './hydrate',
		},
	],
};
