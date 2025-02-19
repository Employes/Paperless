import { create } from '@storybook/theming/create';
import logo from '../packages/core/src/assets/images/paperless.png';

export default create({
	base: 'light',

	colorPrimary: '#D1AEFF',
	colorSecondary: '#ECEAE5',

	// UI
	appBg: '#F8F7F4',
	appContentBg: 'white',
	appBorderColor: 'white',
	appBorderRadius: 8,

	// Typography
	fontBase: '"Geist", serif',
	fontCode: 'monospace',

	// Text colors
	textColor: '#355550',
	textInverseColor: '#fff',

	// Toolbar default and active colors
	barTextColor: '#b0b2cb',
	barSelectedColor: '#528afa',
	barBorderColor: '#528afa',
	barBg: '#fcfdfe',

	// Form colors
	inputBg: 'white',
	inputBorder: 'silver',
	inputTextColor: 'black',
	inputBorderRadius: 3,

	brandTitle: 'Paperless',
	brandUrl: 'https://employes.nl',
	brandImage: logo,
});
