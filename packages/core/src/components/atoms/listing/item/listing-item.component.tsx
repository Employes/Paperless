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
			<div class='flex items-center gap-2 text-storm-500'>
				<p-icon variant={this.icon} />
				<div class='flex min-w-0 flex-1 flex-col text-sm font-medium'>
					<slot />
				</div>
			</div>
		);
	}
}
