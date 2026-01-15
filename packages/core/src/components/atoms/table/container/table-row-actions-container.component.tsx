import { Component, h, Prop } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { cn } from '../../../../utils';

@Component({
	tag: 'p-table-row-actions-container',
	styleUrl: 'table-row-actions-container.component.css',
	shadow: true,
})
export class TableRowActionsContainer {
	/**
	 * Wether the row is checked
	 */
	@Prop() checked: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div
					class={cn(
						'flex before:w-4 before:bg-gradient-to-l before:from-off-white-200',
						{
							'dark:before:from-hurricane-600': !this.checked,
							'dark:before:from-hurricane-400': !!this.checked,
						}
					)}
				>
					<div
						class={cn(
							'flex h-full items-center gap-2 rounded-r-lg bg-off-white-200 pr-3',
							{
								'dark:bg-hurricane-600': !this.checked,
								'dark:bg-hurricane-400': !!this.checked,
							}
						)}
					>
						<slot />
					</div>
				</div>
			</ThemedHost>
		);
	}
}
