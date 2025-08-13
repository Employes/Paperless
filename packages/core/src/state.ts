import { createStore } from '@stencil/store';

export const stateLanguageOptions = ['en', 'nl'];
export const stateThemeOptions = ['light', 'dark'];

const { state: localState, onChange } = createStore({
	theme: stateThemeOptions[0],
	language: stateLanguageOptions[0],
});

export const initTheme = (
	usePreferColorScheme = true,
	localStorageKey: string | boolean = false
) => {
	let themeKey = localStorageKey;
	if (themeKey === true || themeKey === false) {
		themeKey = 'paperless-theme';
	}

	let theme = localStorage.getItem(themeKey);

	if (window.matchMedia && !theme && usePreferColorScheme) {
		theme = window.matchMedia('prefers-color-scheme: dark') ? 'dark' : 'light';
	}

	if (!theme) {
		theme = localState.theme;
	}

	if (theme !== localState.theme) {
		localState.theme = theme;

		if (!!localStorageKey) {
			localStorage.setItem(themeKey, theme);
		}
	}

	document.body.dataset.theme = theme;
	onChange('theme', newValue => {
		document.body.dataset.theme = newValue;

		if (!!localStorageKey) {
			localStorage.setItem(themeKey, newValue);
		}
	});
};

export const state = localState;
export const onStateChange = onChange;
