import { Component, h } from '@stencil/core';

@Component({
	tag: 'p-card-body',
	styleUrl: 'card-body.component.css',
	shadow: true,
})
export class CardBody {
	render() {
		return <slot />;
	}
}
