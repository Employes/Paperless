import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-table-row',
	styleUrl: 'table-row.component.scss',
	shadow: true,
})
export class TableRow {
	/**
	 * Variant of the header
	 */
	@Prop() variant: 'default' | 'header' = 'default';

	/**
	 * Enable hover
	 */
	@Prop() enableHover: boolean = true;

	render() {
		return (
			<Host
				class={`p-table-row variant-${this.variant} ${
					this.enableHover &&
					this.variant === 'default' &&
					'enable-hover'
				} group`}
			>
				<div class="content">
					<slot />
				</div>

				{this.variant === 'default' && <p-divider class="m-0" />}
			</Host>
		);
	}
}
