import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
// import 'codemirror/lib/codemirror.css';
import './codemirror.css';

import { defineCustomElements } from '../packages/core/loader';
defineCustomElements();

import 'tailwindcss/tailwind.css';
import '../packages/core/dist/paperless/paperless.css';
import './custom.css';

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
	actions: { argTypesRegex: '^on[A-Z].*' },
	docs: {
		container: DocsContainer,
		page: DocsPage,
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
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
