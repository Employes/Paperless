export default {
	animation: {
		'fade-in': 'forwards fadeIn .2s ease',
		'fade-out': 'forwards fadeOut .2s ease',
		'slide-in-right': 'forwards slideInRight .5s ease',
		'slide-in-left': 'forwards slideInLeft .5s ease',
		'slide-in-top': 'forwards slideInTop .25 ease',
		'slide-in-bottom': 'forwards slideInBottom .5s ease',
		'slide-in-right-small': 'forwards slideInRightSmall .5s ease',
		'slide-in-left-small': 'forwards slideInLeftSmall .5s ease',
		'slide-in-top-small': 'forwards slideInTopSmall .5s ease',
		'slide-in-bottom-small': 'forwards slideInBottomSmall .5s ease',
		'slide-out-right': 'forwards slideOutRight .2s ease',
		'slide-out-left': 'forwards slideOutLeft .2s ease',
		'slide-out-top': 'forwards slideOutTop .2s ease',
		'slide-out-bottom': 'forwards slideOutBottom .5s ease',
		'slide-out-top-small': 'forwards slideOutTopSmall .5s ease',
		'slide-out-bottom-small': 'forwards slideOutBottomSmall .5s ease',
	},

	keyframes: {
		fadeIn: {
			'0%': { opacity: 0 },
			'100%': { opacity: 100 },
		},
		fadeOut: {
			'0%': { opacity: 100 },
			'100%': { opacity: 0 },
		},
		slideInRight: {
			'0%': { transform: 'translateX(100%)' },
			'100%': { transform: 'translateX(0)' },
		},
		slideInLeft: {
			'0%': { transform: 'translateX(-100%)' },
			'100%': { transform: 'translateX(0)' },
		},
		slideInTop: {
			'0%': { transform: 'translateY(-100%)' },
			'100%': { transform: 'translateY(0)' },
		},
		slideInBottom: {
			'0%': { transform: 'translateY(100%)' },
			'100%': { transform: 'translateY(0)' },
		},
		slideInRightSmall: {
			'0%': { transform: 'translateX(20%)' },
			'100%': { transform: 'translateX(0)' },
		},
		slideInLeftSmall: {
			'0%': { transform: 'translateX(-20%)' },
			'100%': { transform: 'translateX(0)' },
		},
		slideInTopSmall: {
			'0%': { transform: 'translateY(-20%)' },
			'100%': { transform: 'translateY(0)' },
		},
		slideInBottomSmall: {
			'0%': { transform: 'translateY(20%)' },
			'100%': { transform: 'translateY(0)' },
		},
		slideOutRight: {
			'0%': { transform: 'translateX(0)' },
			'100%': { transform: 'translateX(100%)' },
		},
		slideOutLeft: {
			'0%': { transform: 'translateX(0)' },
			'100%': { transform: 'translateX(-100%)' },
		},
		slideOutTop: {
			'0%': { transform: 'translateY(0)' },
			'100%': { transform: 'translateY(-100%)' },
		},
		slideOutBottom: {
			'0%': { transform: 'translateY(0)' },
			'100%': { transform: 'translateY(100%)' },
		},
		slideOutTopSmall: {
			'0%': { transform: 'translateY(0)' },
			'100%': { transform: 'translateY(-20%)' },
		},
		slideOutBottomSmall: {
			'0%': { transform: 'translateY(0)' },
			'100%': { transform: 'translateY(20%)' },
		},
	},
};
