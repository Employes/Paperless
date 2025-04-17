import { create } from '@storybook/theming';
import logo from '../packages/core/src/assets/images/paperless.png';

export default create({
	base: 'light',

	colorPrimary: '#D1AEFF',
	colorSecondary: '#ECEAE5',

	// UI
	appBg: '#F8F7F4',
	appContentBg: 'white',
	appPreviewBg: 'white',
	appBorderColor: 'white',
	appBorderRadius: 8,

	// Typography
	fontBase: '"Geist", serif',
	fontCode: 'monospace',

	// Text colors
	textColor: '#355550',
	textInverseColor: '#fff',
	textMutedColor: '#b0b2cb',

	// Toolbar default and active colors
	barTextColor: '#355550',
	barHoverColor: '#032a24',
	barSelectedColor: '#032a24',
	barBg: '#fcfdfe',

	buttonBg: '#D1AEFF',
	buttonBorder: 'transparent',

	booleanBg: '#fcfdfe',
	booleanSelectedBg: '#D1AEFF',

	// Form colors
	inputBg: 'white',
	inputBorder: '#D1AEFF',
	inputTextColor: '#003832',
	inputBorderRadius: 8,

	brandTitle: 'Paperless',
	brandUrl: 'https://employes.nl',
	brandImage: logo,
});
