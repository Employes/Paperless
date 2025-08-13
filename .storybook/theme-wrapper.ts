import { state } from '../packages/core/dist/build/index.esm.js';
import { useDarkMode } from 'storybook-dark-mode';

export const themeWrapper = (story, ctx) => {
	const darkMode = useDarkMode();
	state.theme = darkMode ? 'dark' : 'light';

	return story(ctx);
};
