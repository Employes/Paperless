import { Placement, Strategy } from '@floating-ui/dom';
import { Component, h, Host, Prop } from '@stencil/core';

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
			<Host>
				<p-tooltip
					class='flex'
					placement={this.placement}
					strategy={this.strategy}
				>
					<p-icon
						size='sm'
						class='cursor-pointer text-storm-300 hover:text-storm'
						variant='question-circle'
						slot='trigger'
					/>

					<div slot='content'>
						<slot />
					</div>
				</p-tooltip>
			</Host>
		);
	}
}
