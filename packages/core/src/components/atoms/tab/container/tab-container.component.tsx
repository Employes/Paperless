import { Component, h, Prop } from '@stencil/core';

import { cn } from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';

@Component({
	tag: 'p-tab-container',
	styleUrl: 'tab-container.component.css',
	shadow: true,
})
export class TabContainer {
	/**
	 * Whether to enable scroll
	 */
	@Prop() enableScroll: boolean = true;

	render() {
		return (
			<div class='relative flex h-8 w-full flex-col'>
				<div
					class={cn('flex w-full gap-5 scrollbar-hide', {
						'overflow-x-auto': asBoolean(this.enableScroll),
					})}
				>
					<slot />
				</div>
				<p-divider
					class='
       absolute bottom-0 left-0 m-0 w-full text-off-white-700
       dark:text-hurricane-400
     '
				/>
			</div>
		);
	}
}
