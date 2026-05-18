import { stencilSSR } from '@stencil/ssr';

export const paperless = () =>
	stencilSSR({
		module: import('./components'),
		from: '@paperless/react',
		hydrateModule: import('@paperless/core/hydrate'),
		serializeShadowRoot: {
			scoped: [],
			default: 'declarative-shadow-dom',
		},
	});
