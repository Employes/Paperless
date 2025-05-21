import { Placement, Strategy } from '@floating-ui/dom';
import { Component, h, Prop } from '@stencil/core';

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
			<p-tooltip
				placement={this.placement}
				strategy={this.strategy}
			>
				<div slot='content'>
					<slot />
				</div>

				<p-icon
					size='sm'
					class='cursor-pointer text-black-teal-300 hover:text-black-teal'
					variant='question-circle'
					slot='trigger'
				/>
			</p-tooltip>
		);
	}
}
