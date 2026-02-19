import { Component, h, Host } from '@stencil/core';
import { cva } from 'class-variance-authority';

const container = cva('relative flex flex-col');

@Component({
	tag: 'p-table-container',
	styleUrl: 'table-container.component.css',
})
export class TableContainer {
	render() {
		return (
			<Host class={container()}>
				<slot />
			</Host>
		);
	}
}
