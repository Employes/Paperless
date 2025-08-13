import { createStore } from '@stencil/store';

export type StateThemeOption = 'light' | 'dark';
export type StateLocaleOption = 'en' | 'nl';

export const stateThemeOptions: StateThemeOption[] = ['light', 'dark'];
export const stateLocaleOptions: StateLocaleOption[] = ['nl', 'en'];

export interface PaperlessState {
	theme: StateThemeOption;
	locale: StateLocaleOption;
}

const { state: localState, onChange } = createStore<PaperlessState>({
	theme: stateThemeOptions[0],
	locale: stateLocaleOptions[0],
});

export const initTheme = (
	usePreferColorScheme = true,
	localStorageKey: string | boolean = false
) => {
	let themeKey = localStorageKey;
	if (themeKey === true || themeKey === false) {
		themeKey = 'paperless-theme';
	}

	let theme: StateThemeOption = localStorage.getItem(
		themeKey
	) as StateThemeOption;

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
