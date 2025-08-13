import { FunctionalComponent, h, Host } from '@stencil/core';
import { state } from '../state';

export const ThemedHost: FunctionalComponent = (props, children) => {
	return (
		<Host
			{...props}
			data-theme={state.theme}
		>
			{children}
		</Host>
	);
};
