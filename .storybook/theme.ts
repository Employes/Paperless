import { create } from '@storybook/theming';
import logo from '../packages/core/src/assets/images/paperless.png';

export default create({
	base: 'light',

	colorPrimary: '#8EB3FB',
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
	textColor: '#74787F',
	textInverseColor: '#fff',
	textMutedColor: '#b0b2cb',

	// Toolbar default and active colors
	barTextColor: '#464B54',
	barHoverColor: '#181E29',
	barSelectedColor: '#181E29',
	barBg: '#fcfdfe',

	buttonBg: '#8EB3FB',
	buttonBorder: 'transparent',

	booleanBg: '#fcfdfe',
	booleanSelectedBg: '#8EB3FB',

	// Form colors
	inputBg: 'white',
	inputBorder: '#8EB3FB',
	inputTextColor: '#181E29',
	inputBorderRadius: 8,

	brandTitle: 'Paperless',
	brandUrl: 'https://employes.nl',
	brandImage: logo,
});
