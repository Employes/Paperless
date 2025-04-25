import fs from 'fs';
 import animation from './animation';
 import colors from './colors';
 import height from './height';
 import rotate from './rotate';
 import scale from './scale';
 import screens from './screens';
 import shadows from './shadows';
 import spacing from './spacing';
 import typeograhpy from './typography';
 import width from './width';
 import zIndex from './z-index';


 export const paperless = {
 		theme: {
 			colors,
 			boxShadow: shadows,
 			dropShadow: shadows,
 			extend: {
 				keyframs: animation.keyframes,
 				animation: animation.animation,
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
 	};

 fs.writeFileSync('paperless.config.json', JSON.stringify(paperless, null, 2))

