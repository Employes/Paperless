import plugin from 'tailwindcss/plugin';

import animation from './theme/animation';
import colors from './theme/colors';
import height from './theme/height';
import rotate from './theme/rotate';
import scale from './theme/scale';
import screens from './theme/screens';
import shadows from './theme/shadows';
import spacing from './theme/spacing';
import typeograhpy from './theme/typography';
import width from './theme/width';
import zIndex from './theme/z-index';

import hover from './plugins/hover';
import safeArea from './plugins/safe-area';

import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import scrollbarHidePlugin from 'tailwind-scrollbar-hide';

export const paperless = plugin(
	pluginAPI => {
		safeArea(pluginAPI);
		hover(pluginAPI);
	},
	{
		theme: {
			colors,
			boxShadow: shadows,
			dropShadow: shadows,
			extend: {
				animation: animation.animation,
				keyframes: animation.keyframes,
				fontFamily: {
					geist: ['Geist', 'serif'],
					ambit: ['Ambit', 'sans-serif'],
				},
				scale,
				rotate,
				fontSize: typeograhpy.fontSize,
				lineHeight: typeograhpy.lineHeight,
				zIndex,
				screens,
				width: width.width,
				height: height.height,
				spacing,
				aspectRatio: {
					branding: '23/24',
				},
			},
		},
		plugins: [
			aspectRatioPlugin,
			scrollbarHidePlugin,
			safeArea,
			hover,
		],
	}
);
