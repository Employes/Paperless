import { FunctionalComponent, h, Host } from '@stencil/core';
import { state } from '../state';
import { HostAttributes } from '@stencil/core/internal';

export const ThemedHost: FunctionalComponent<HostAttributes> = (
	props,
	children
) => {
	return (
		<Host
			{...props}
			data-theme={state.theme}
		>
			{children}
		</Host>
	);
};
