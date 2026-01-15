import { FunctionalComponent, h, Host } from '@stencil/core';
import { HostAttributes } from '@stencil/core/internal';

import { state } from '../state';

export const ThemedHost: FunctionalComponent<HostAttributes> = (
	props,
	children
) => (
	<Host
		{...props}
		data-theme={state.theme}
	>
		{children}
	</Host>
);
