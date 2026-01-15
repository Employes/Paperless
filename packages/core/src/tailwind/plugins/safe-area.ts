const safeArea = ({ addUtilities }) => {
	const utilities = {
		'.m-safe': {
			marginTop: 'env(safe-area-inset-top)',
			marginRight: 'env(safe-area-inset-right)',
			marginBottom: 'env(safe-area-inset-bottom)',
			marginLeft: 'env(safe-area-inset-left)',
		},
		'.mx-safe': {
			marginRight: 'env(safe-area-inset-right)',
			marginLeft: 'env(safe-area-inset-left)',
		},
		'.my-safe': {
			marginTop: 'env(safe-area-inset-top)',
			marginBottom: 'env(safe-area-inset-bottom)',
		},
		'.my-safe-2': {
			marginTop: 'calc(env(safe-area-inset-top)+0.5rem)',
			marginBottom: 'calc(env(safe-area-inset-bottom)+0.5rem)',
		},
		'.mt-safe': {
			marginTop: 'env(safe-area-inset-top)',
		},
		'.mr-safe': {
			marginRight: 'env(safe-area-inset-right)',
		},
		'.mb-safe': {
			marginBottom: 'env(safe-area-inset-bottom)',
		},
		'.ml-safe': {
			marginLeft: 'env(safe-area-inset-left)',
		},
		'.p-safe': {
			paddingTop: 'env(safe-area-inset-top)',
			paddingRight: 'env(safe-area-inset-right)',
			paddingBottom: 'env(safe-area-inset-bottom)',
			paddingLeft: 'env(safe-area-inset-left)',
		},
		'.px-safe': {
			paddingRight: 'env(safe-area-inset-right)',
			paddingLeft: 'env(safe-area-inset-left)',
		},
		'.py-safe': {
			paddingTop: 'env(safe-area-inset-top)',
			paddingBottom: 'env(safe-area-inset-bottom)',
		},
		'.py-safe-2': {
			paddingTop: 'calc(env(safe-area-inset-top)+0.5rem)',
			paddingBottom: 'calc(env(safe-area-inset-bottom)+0.5rem)',
		},
		'.pt-safe': {
			paddingTop: 'env(safe-area-inset-top)',
		},
		'.pr-safe': {
			paddingRight: 'env(safe-area-inset-right)',
		},
		'.pb-safe': {
			paddingBottom: 'env(safe-area-inset-bottom)',
		},
		'.pl-safe': {
			paddingLeft: 'env(safe-area-inset-left)',
		},
		'.min-h-screen': {
			minHeight: '100vh',
		},
		'.min-h-screen-safe': {
			minHeight:
				'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
		},
		'.max-h-screen': {
			maxHeight: '100vh',
		},
		'.max-h-screen-safe': {
			maxHeight:
				'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
		},
		'.h-screen-safe': {
			height:
				'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
		},
		'.min-w-screen': {
			minWidth: '100vw',
		},
		'.min-w-screen-safe': {
			minWidth:
				'calc(100vw - (env(safe-area-inset-left) + env(safe-area-inset-right)))',
		},
		'.max-w-screen': {
			maxWidth: '100vw',
		},
		'.max-w-screen-safe': {
			maxWidth:
				'calc(100vw - (env(safe-area-inset-left) + env(safe-area-inset-right)))',
		},
		'.w-screen-safe': {
			width:
				'calc(100vw - (env(safe-area-inset-left) + env(safe-area-inset-right)))',
		},
	};

	addUtilities(utilities);
};

export default safeArea;
