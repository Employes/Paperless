import { Component, h } from '@stencil/core';

@Component({
	tag: 'p-table-row-actions-container',
	styleUrl: 'table-row-actions-container.component.css',
	shadow: true,
})
export class TableRowActionsContainer {
	render() {
		return (
			<div class='flex before:w-4 before:bg-gradient-to-l before:from-off-white-200'>
				<div class='flex h-full items-center gap-2 rounded-r-lg bg-off-white-200 pr-3'>
					<slot />
				</div>
			</div>
		);
	}
}
