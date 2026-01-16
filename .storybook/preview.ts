import {
	setStencilDocJson,
	extractArgTypesFactory,
	stencilRender,
} from '@pxtrn/storybook-addon-docs-stencil';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';

import docJson from '../packages/core/component-docs.json';
if (docJson) setStencilDocJson(docJson);

import { extractDefaultArgs } from './default-args';

import './tailwind.css';
import { themeWrapper } from './theme-wrapper';

const options = {
	excludeCategories: ['properties'],
	controlsFor: 'attributes',
	eventNameing: 'jsx',
};

const parameters = {
	options: {
		storySort: (story1, story2) =>
			globalThis['storybook-multilevel-sort:storySort'](story1, story2),
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
	parameters,
	layout: 'centered',
	render: stencilRender(),
	decorators: [themeWrapper],
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
