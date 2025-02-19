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
import tailwindConf from './src/tailwind.config';

setPluginConfigurationDefaults({
	enableDebug: false,
	tailwindCssContents:
		'@tailwind utilities;@tailwind components; * { @apply box-border; }',
	tailwindConf: tailwindConf as any,
});

export const config: Config = {
	namespace: 'paperless',
	globalStyle: 'src/style/paperless.scss',
	extras: {
		experimentalImportInjection: true,
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
		angular({
			componentCorePackage: '@paperless/core',
			directivesProxyFile:
				'../angular/projects/paperless/src/lib/stencil/components.ts',
			directivesArrayFile:
				'../angular/projects/paperless/src/lib/stencil/index.ts',
			excludeComponents: [
				'p-table',
				'p-table-column',
				'p-table-row-action',
				'p-table-cell',
				'p-toast-container',
			],
		}),
		react({
			componentCorePackage: '@paperless/core',
			proxiesFile: '../react/src/components/stencil/index.ts',
			includeDefineCustomElements: true,
		}),
		{
			type: 'dist',
			esmLoaderPath: '../loader',
		},
		{
			type: 'dist-custom-elements',
		},
		{
			type: 'docs-readme',
		},
		{
			type: 'www',
			serviceWorker: null, // disable service workers
		},
		{
			type: 'dist-hydrate-script',
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
	],
};
