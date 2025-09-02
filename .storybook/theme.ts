import { create } from '@storybook/theming';
import logo from '../packages/core/src/assets/images/paperless.png';

export const light = create({
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

export const dark = create({
	base: 'dark',

	colorPrimary: '#8EB3FB',
	colorSecondary: '#ECEAE5',

	// UI
	appBg: '#232934',
	appContentBg: '#232934',
	appPreviewBg: '#232934',
	appBorderColor: '#232934',
	appBorderRadius: 8,

	// Typography
	fontBase: '"Geist", serif',
	fontCode: 'monospace',

	// Text colors
	textColor: 'white',
	textInverseColor: 'black',
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

export default light;
