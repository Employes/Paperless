import { Component, h } from '@stencil/core';

@Component({
	tag: 'p-drawer-body',
	styleUrl: 'drawer-body.component.css',
	shadow: true,
})
export class DrawerBody {
	render() {
		return <slot />;
	}
}
