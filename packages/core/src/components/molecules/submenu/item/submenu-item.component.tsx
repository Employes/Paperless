import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { IconVariant } from '../../../../types/icon';
import { cn } from '../../../../utils';

const content = cva(
	[
		'flex items-center gap-6',
		'h-8 w-full pl-6',
		'cursor-pointer',
		'group/submenu-item',
	],
	{
		variants: {},
	}
);

@Component({
	tag: 'p-submenu-item',
	styleUrl: 'submenu-item.component.css',
	shadow: true,
})
export class SubmenuItem {
	/**
	 * Wether the submenu is active or not
	 */
	@Prop({ reflect: true }) active: boolean = false;

	/**
	 * Icon to show on the label
	 */
	@Prop({ reflect: true }) icon: IconVariant = 'placeholder';

	render() {
		return (
			<ThemedHost>
				<div class={cn(content({}), {})}>
					<div
						class={cn(`h-full w-[2px] transition-colors`, {
							'bg-indigo-600': this.active,
							'bg-transparent group-hover/submenu-item:bg-indigo-600':
								!this.active,
						})}
					/>

					<div
						class={cn('flex items-center gap-2 transition-colors', {
							'text-storm-400 dark:text-hurricane-100': !this.active,
							'text-indigo-600': this.active,
						})}
					>
						<p-icon variant={this.icon} />

						<slot />
					</div>
				</div>
			</ThemedHost>
		);
	}
}
