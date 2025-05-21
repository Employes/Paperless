import { Component, h, Prop } from '@stencil/core';
import { IconVariant } from '../../icon/icon.component';


@Component({
	tag: 'p-listing-item',
	styleUrl: 'listing-item.component.css',
	shadow: true,
})
export class ListingItem {
	/**
	 * The icon of the step
	 */
	@Prop() icon: IconVariant = 'placeholder';


	render() {
		return (
			<div class="flex gap-2  items-center text-black-teal">
				<p-icon variant={this.icon} />
				<div class="flex flex-col font-medium text-sm"
				>
					<slot />
				</div>
			</div>
		);
	}
}
