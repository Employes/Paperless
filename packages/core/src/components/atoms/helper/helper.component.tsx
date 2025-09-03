import { Placement, Strategy } from '@floating-ui/dom';
import { Component, h, Prop } from '@stencil/core';
import { ThemedHost } from '../../../internal/themed-host.component';

@Component({
	tag: 'p-helper',
	styleUrl: 'helper.component.css',
	shadow: true,
})
export class Helper {
	/**
	 * The strategy of the popover placement
	 */
	@Prop() strategy: Strategy = 'absolute';

	/**
	 * The placement of the helper popover
	 */
	@Prop() placement: Placement = 'top';

	render() {
		return (
			<ThemedHost>
				<p-tooltip
					class='flex'
					placement={this.placement}
					strategy={this.strategy}
				>
					<p-icon
						size='sm'
						class='cursor-pointer text-storm-300 hover:text-storm-500 dark:text-hurricane-300 dark:hover:text-hurricane-200'
						variant='question-circle'
						slot='trigger'
					/>

					<div slot='content'>
						<slot />
					</div>
				</p-tooltip>
			</ThemedHost>
		);
	}
}
