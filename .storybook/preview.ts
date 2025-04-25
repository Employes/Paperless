import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import {
	setStencilDocJson,
	extractArgTypesFactory,
	stencilRender,
} from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '../packages/core/component-docs.json';
if (docJson) setStencilDocJson(docJson);

// import 'codemirror/lib/codemirror.css';
// import './codemirror.css';

// import { defineCustomElements } from '../packages/core/loader';
// defineCustomElements();

// import './preview.css'

import { extractDefaultArgs } from './default-args';

// export const globalTypes = {
//     locale: {
//         name: 'Locale',
//         description: 'Internationalization locale',
//         defaultValue: 'en',
//         toolbar: {
//             icon: 'globe',
//             items: [
//                 { value: 'en', right: '🇺🇸', title: 'English' },
//                 { value: 'nl', right: '🇳🇱', title: 'Nederlands' },
//             ],
//         },
//     },
// };
//

const options = {
	excludeCategories: ['properties'],
	controlsFor: 'attributes',
	eventNameing: 'jsx',
};

export const parameters = {
	options: {
		storySort: {
			order: [
				'Introduction',
				['Welcome', 'Changelog'],
				'Foundation',
				'Design system',
				[
					'Typography',
					'Grid',
					'Bosons',
					'Atoms',
					'Molecules',
					'Organisms',
					'Templates',
					'Helpers',
				],
			],
		},
	},
	previewTabs: {
		'storybook/docs/panel': {
			title: 'Documentation',
			hidden: true,
		},
		canvas: {
			title: 'Story',
			hidden: true,
		},
	},
	docs: {
		container: DocsContainer,
		page: DocsPage,
		extractArgTypes: extractArgTypesFactory(options),
	},
	badgesConfig: {
		stable: {
			contract: '#fff',
			color: '#1da360',
			title: 'Stable',
		},
		beta: {
			contract: '#fff',
			color: '#ffa231',
			title: 'Beta',
		},
		deprecated: {
			contract: '#fff',
			color: '#e63241',
			title: 'Deprecated',
		},
	},
	controls: {
		controls: { hideNoControlsWarning: true },
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

const preview = {
	render: stencilRender(),
	argsEnhancers: [
		context => {
			const { initialArgs, component } = context;

			if (initialArgs) {
				return extractDefaultArgs(component, false, initialArgs);
			}

			return {};
		},
	],
};

export default preview;
